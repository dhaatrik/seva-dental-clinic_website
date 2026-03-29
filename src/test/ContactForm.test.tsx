import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ContactForm from '../../components/ContactForm';
import React from 'react';

// Mock react-i18next to provide predictable translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => options?.defaultValue || key,
  }),
}));

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 1. Clean up lingering timers (Fixes potential memory leaks and state updates on unmounted components)
    // In ContactForm.tsx, a success message disappears after 5 seconds via setTimeout(() => setSubmitted(false), 5000).
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('displays validation errors when submitting an empty form', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Message is required.')).toBeInTheDocument();
  });

  it('displays invalid email warning for incorrect email format', async () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    expect(screen.getByText('Email address is invalid.')).toBeInTheDocument();
  });

  it('shows loading state and disables button during submission', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there!' } });
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // We wrap the submission trigger in act because it leads to state updates
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check loading state immediately
    expect(submitButton).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders success screen after successful submission delay', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.click(submitButton);

    // Fast-forward through the 1000ms mock submission delay
    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    // Assert that the success UI is rendered
    expect(screen.getByText('Thank You!')).toBeInTheDocument();
    expect(screen.getByText(/Your message has been sent/i)).toBeInTheDocument();
    
    // Verify the form is no longer visible
    expect(screen.queryByLabelText(/full name/i)).not.toBeInTheDocument();
  });
});
