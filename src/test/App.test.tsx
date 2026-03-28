import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

// Mock complex components and libraries that might interfere with simple integration tests
vi.mock('lenis/react', () => ({
  ReactLenis: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useLenis: () => ({ stop: vi.fn(), start: vi.fn() }),
}));

vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
      h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
      h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => options?.defaultValue || key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}));

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // JSDOM mocks
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    window.scrollTo = vi.fn();

    // IntersectionObserver isn't in JSDOM
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it('renders Header, Footer and HomePage by default', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Header check (Clinic Name is in Header)
    expect(screen.getAllByText(/Seva Dental Clinic/i)[0]).toBeInTheDocument();
    
    // Footer check (Quick Links is a heading in Footer)
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
    
    // HomePage check (Hero title or specific welcome text)
    expect(screen.getByText(/Welcome to Your Smile Adventure/i)).toBeInTheDocument();
  });

  it('navigates to Services page when link is clicked', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Find the Services link in navigation
    const servicesLinks = screen.getAllByRole('link', { name: /services/i });
    
    await act(async () => {
        fireEvent.click(servicesLinks[0]);
    });

    // Check if ServicesPage content is rendered
    expect(screen.getByText(/Our Dental Services/i)).toBeInTheDocument();
    // HomePage content should be gone
    expect(screen.queryByText(/Welcome to Your Smile Adventure/i)).not.toBeInTheDocument();
  });

  it('renders NotFoundPage for invalid routes', () => {
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/some-invalid-route']}>
          <App />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Assert 404 text is present
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Oops! Page Not Found/i)).toBeInTheDocument();
  });
});
