import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';

const wrapWithProviders = (ui: React.ReactElement) => {
  return (
    <AccessibilityProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </AccessibilityProvider>
  );
};

describe('Header component', () => {
  it('renders logo and navigation links', () => {
    render(wrapWithProviders(<Header />));
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check navigation links inside the desktop nav to avoid duplicates
    const nav = screen.getByRole('navigation', { name: "Main Navigation" });
    expect(within(nav).getByText('Home')).toBeInTheDocument();
    expect(within(nav).getByText('Services')).toBeInTheDocument();
  });

  it('toggles mobile menu', async () => {
    // Need to mock window matchMedia or let tailwind handle hiding classes
    render(wrapWithProviders(<Header />));
    
    const menuButton = screen.getByRole('button', { name: 'Toggle menu' });
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu
    await userEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });
});
