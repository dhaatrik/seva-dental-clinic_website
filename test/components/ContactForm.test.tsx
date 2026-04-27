import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ContactForm from '../../components/ContactForm';

describe('ContactForm component', () => {
  it('renders form inputs correctly', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  it('validates empty fields on blur or partial input', async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/Full Name/i);
    await userEvent.click(nameInput);
    await userEvent.type(nameInput, ' ');
    await userEvent.tab();

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
  });

  it('validates email format', async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    await userEvent.type(emailInput, 'invalidemail');
    await userEvent.tab();

    expect(await screen.findByText('Email address is invalid.')).toBeInTheDocument();
  });

  it('handles successful submission simulation', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/Email Address/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/Message/i), 'Hello world from the test!');

    await userEvent.click(screen.getByRole('button', { name: /Send Message/i }));
    
    expect(screen.getByRole('button')).toBeDisabled();
    
    // Wait for the success state screen
    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument();
      expect(screen.getByText("Your message has been sent. We'll get back to you shortly.")).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
