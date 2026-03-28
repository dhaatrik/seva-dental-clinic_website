import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../../components/Button';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a link when "to" prop is provided', () => {
    render(
      <BrowserRouter>
        <Button to="/test">Link Button</Button>
      </BrowserRouter>
    );
    const link = screen.getByRole('button');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('is disabled when "disabled" prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
