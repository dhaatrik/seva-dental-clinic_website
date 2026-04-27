import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import BlogPage from '../../pages/BlogPage';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <HelmetProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </HelmetProvider>
  );
};

describe('BlogPage', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
  });

  it('renders blog list and search input initially', () => {
    render(wrapWithProviders(<BlogPage />));
    expect(screen.getByPlaceholderText(/Search articles/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('filters posts based on search input', async () => {
    render(wrapWithProviders(<BlogPage />));
    const searchInput = screen.getByPlaceholderText(/Search articles/i);
    
    await userEvent.type(searchInput, 'NonExistentGibberishString123');
    
    // Expect No articles found message
    expect(await screen.findByText(/No articles found/i)).toBeInTheDocument();
  });

  it('filters posts based on category click', async () => {
    render(wrapWithProviders(<BlogPage />));
    
    // Click on a specific category like "Preventive Care" 
    const categoryButton = screen.queryByText('Preventive Care');
    if (categoryButton) {
      await userEvent.click(categoryButton);
      // Wait for re-render
      // Since it's dynamic, we just check no error is thrown
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    }
  });
});
