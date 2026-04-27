import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
import Tooltip from '../../components/Tooltip';

describe('Tooltip component', () => {
  it('does not show tooltip text initially', () => {
    render(
      <Tooltip text="Hover me">
        <button>Target</button>
      </Tooltip>
    );
    expect(screen.queryByText('Hover me')).not.toBeInTheDocument();
  });

  it('shows tooltip text on hover', async () => {
    render(
      <Tooltip text="Hover me">
        <button>Target</button>
      </Tooltip>
    );
    
    await userEvent.hover(screen.getByText('Target'));
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    
    await userEvent.unhover(screen.getByText('Target'));
    await waitForElementToBeRemoved(() => screen.queryByText('Hover me'));
  });

  it('shows tooltip text on focus', async () => {
    render(
      <Tooltip text="Focus me">
        <button>Target</button>
      </Tooltip>
    );
    
    await userEvent.tab(); // focus the button
    expect(screen.getByText('Focus me')).toBeInTheDocument();
    
    await userEvent.tab(); // blur the button
    await waitForElementToBeRemoved(() => screen.queryByText('Focus me'));
  });
});
