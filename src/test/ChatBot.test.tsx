import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChatBot from '../../components/ChatBot';
import { getChatbotResponse } from '../../services/geminiService';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => options?.defaultValue || key,
  }),
}));

// Mock geminiService
vi.mock('../../services/geminiService', () => ({
  getChatbotResponse: vi.fn(),
}));

describe('ChatBot Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // JSDOM doesn't implement scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  it('toggles the chatbot window when clicked', () => {
    render(<ChatBot />);
    
    const toggleButton = screen.getByLabelText(/open smile guide chat/i);
    
    // Initially closed (shouldn't see the title)
    expect(screen.queryByText('Smile Guide')).not.toBeInTheDocument();
    
    // Open
    fireEvent.click(toggleButton);
    expect(screen.getByText('Smile Guide')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type your message/i)).toBeInTheDocument();
    
    // Close using the X button in header
    const closeButton = screen.getByLabelText(/close chat/i);
    fireEvent.click(closeButton);
    expect(screen.queryByText('Smile Guide')).not.toBeInTheDocument();
  });

  it('adds user message to chat and clears input on send', async () => {
    vi.mocked(getChatbotResponse).mockResolvedValue('Bot reply');
    render(<ChatBot />);
    
    // Open chat
    fireEvent.click(screen.getByLabelText(/open smile guide chat/i));
    
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByLabelText(/send message/i);
    
    // Type and send
    fireEvent.change(input, { target: { value: 'Hello, I have a question' } });
    
    await act(async () => {
        fireEvent.click(sendButton);
    });
    
    // Assert user message appears
    expect(screen.getByText('Hello, I have a question')).toBeInTheDocument();
    // Assert input is cleared
    expect(input).toHaveValue('');
  });

  it('shows loading indicator and then the bot response', async () => {
    let resolveResponse: (value: string) => void;
    const responsePromise = new Promise<string>((resolve) => {
      resolveResponse = resolve;
    });
    vi.mocked(getChatbotResponse).mockReturnValue(responsePromise);

    const { container } = render(<ChatBot />);
    fireEvent.click(screen.getByLabelText(/open smile guide chat/i));
    
    const input = screen.getByPlaceholderText(/type your message/i);
    fireEvent.change(input, { target: { value: 'What are your hours?' } });
    
    await act(async () => {
        fireEvent.click(screen.getByLabelText(/send message/i));
    });

    // Check for loading dots (identified by the animate-bounce class)
    const loadingDots = container.querySelectorAll('.animate-bounce');
    expect(loadingDots.length).toBe(3);
    
    // Resolve the promise
    await act(async () => {
        resolveResponse!('Our hours are 9-6, Mon-Fri.');
    });

    // Verify response appears and loading dots disappear
    await waitFor(() => {
      expect(screen.getByText('Our hours are 9-6, Mon-Fri.')).toBeInTheDocument();
    });
    expect(container.querySelectorAll('.animate-bounce').length).toBe(0);
  });

  it('disables the send button when input is empty or whitespace', () => {
    render(<ChatBot />);
    fireEvent.click(screen.getByLabelText(/open smile guide chat/i));
    
    const input = screen.getByPlaceholderText(/type your message/i);
    const sendButton = screen.getByLabelText(/send message/i);
    
    // Case 1: Empty
    expect(sendButton).toBeDisabled();
    
    // Case 2: Only spaces
    fireEvent.change(input, { target: { value: '   ' } });
    expect(sendButton).toBeDisabled();
    
    // Case 3: Valid text
    fireEvent.change(input, { target: { value: 'Help' } });
    expect(sendButton).not.toBeDisabled();
  });
});
