import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TestimonialsPage from '../../pages/TestimonialsPage';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );
};

// We will mock the TESTIMONIALS_DATA import or just test the component's render
describe('TestimonialsPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
  });

  it('renders correctly', () => {
    render(wrapWithProviders(<TestimonialsPage />));
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('handles pagination next click', async () => {
    render(wrapWithProviders(<TestimonialsPage />));
    const nextButton = screen.queryByRole('button', { name: /Next page/i });
    if (nextButton) {
      await userEvent.click(nextButton);
      const prevButton = screen.getByRole('button', { name: /Previous page/i });
      expect(prevButton).not.toBeDisabled();
    }
  });
});
