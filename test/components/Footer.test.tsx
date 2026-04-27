import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../components/Footer';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <AccessibilityProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AccessibilityProvider>
  );
};

describe('Footer component', () => {
  it('renders correctly with clinic details', () => {
    render(wrapWithProviders(<Footer />));
    expect(screen.getByText(/Your Smile Adventure/i)).toBeInTheDocument();
    expect(screen.getByText(/Follow Us/i)).toBeInTheDocument();
  });

  it('handles newsletter subscription with validation', async () => {
    render(wrapWithProviders(<Footer />));
    const input = screen.getByPlaceholderText(/Your email address/i);
    const form = input.closest('form');

    // Try submitting empty
    fireEvent.submit(form!);
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();

    // Try submitting invalid email
    await userEvent.clear(input);
    await userEvent.type(input, 'invalid');
    fireEvent.submit(form!);
    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();

    // Try successful submit
    await userEvent.clear(input);
    await userEvent.type(input, 'test@example.com');
    fireEvent.submit(form!);
    
    await waitFor(() => {
        expect(screen.getByText(/Thanks for joining our newsletter!/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
