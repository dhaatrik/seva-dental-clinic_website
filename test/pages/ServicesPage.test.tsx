import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ServicesPage from '../../pages/ServicesPage';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('ServicesPage', () => {
  it('renders page wrapper and headings', () => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
    render(wrapWithProviders(<ServicesPage />));
    
    // Check main title
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
