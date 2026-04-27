import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from '../../pages/HomePage';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('HomePage', () => {
  it('renders hero section correctly', () => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
    render(wrapWithProviders(<HomePage />));
    
    // Check main hero heading element is in the document
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('contains call to action buttons', () => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
    render(wrapWithProviders(<HomePage />));
    
    // Check main buttons
    const ctaButtons = screen.getAllByRole('button', { name: /book consultation/i });
    expect(ctaButtons.length).toBeGreaterThan(0);
  });
});
