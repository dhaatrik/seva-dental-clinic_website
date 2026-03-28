import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import React from 'react';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => options?.defaultValue || key,
  }),
}));

describe('BeforeAfterSlider Component', () => {
  const beforeImg = 'before.jpg';
  const afterImg = 'after.jpg';

  beforeEach(() => {
    // Mock getBoundingClientRect for the container
    // This allows us to test the percentage calculation based on mouse position
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 1000,
      height: 500,
      top: 0,
      left: 0,
      bottom: 500,
      right: 1000,
      x: 0,
      y: 0,
      toJSON: () => {},
    });
  });

  it('renders both images and initializes slider at 50%', () => {
    render(<BeforeAfterSlider beforeImage={beforeImg} afterImage={afterImg} />);
    
    const beforeImage = screen.getByAltText('Before treatment');
    const afterImage = screen.getByAltText('After treatment');
    
    expect(beforeImage).toBeInTheDocument();
    expect(afterImage).toBeInTheDocument();
    expect(beforeImage).toHaveAttribute('src', beforeImg);
    expect(afterImage).toHaveAttribute('src', afterImg);

    // Initial position check (50%)
    // The "Before" image uses clip-path to show the left half
    expect(beforeImage).toHaveStyle({
      clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
    });
  });

  it('clamps slider position between 0% and 100% during drag', () => {
    render(<BeforeAfterSlider beforeImage={beforeImg} afterImage={afterImg} />);
    const container = screen.getByAltText('Before treatment').parentElement!;

    // Start dragging
    fireEvent.mouseDown(container, { clientX: 500 });
    
    // Move to negative X (beyond left bound)
    fireEvent.mouseMove(window, { clientX: -100 });
    const beforeImage = screen.getByAltText('Before treatment');
    expect(beforeImage).toHaveStyle({ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' });

    // Move beyond right bound (container width is 1000)
    fireEvent.mouseMove(window, { clientX: 1100 });
    expect(beforeImage).toHaveStyle({ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' });

    // Move to valid middle point
    fireEvent.mouseMove(window, { clientX: 250 });
    expect(beforeImage).toHaveStyle({ clipPath: 'polygon(0 0, 25% 0, 25% 100%, 0 100%)' });
  });

  it('fades out labels when slider is pushed to extreme ends', () => {
    render(<BeforeAfterSlider beforeImage={beforeImg} afterImage={afterImg} />);
    const container = screen.getByAltText('Before treatment').parentElement!;
    
    const beforeLabel = screen.getByText('Before');
    const afterLabel = screen.getByText('After');

    // Default (50%) - both labels visible
    expect(beforeLabel).not.toHaveClass('opacity-0');
    expect(afterLabel).not.toHaveClass('opacity-0');

    // Drag to far left (< 20%)
    fireEvent.mouseDown(container, { clientX: 100 }); // 10%
    expect(beforeLabel).toHaveClass('opacity-0');
    expect(afterLabel).not.toHaveClass('opacity-0');

    // Drag to far right (> 80%)
    fireEvent.mouseMove(window, { clientX: 900 }); // 90%
    expect(beforeLabel).not.toHaveClass('opacity-0');
    expect(afterLabel).toHaveClass('opacity-0');
  });
});
