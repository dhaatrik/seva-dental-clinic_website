import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Modal from '../../components/Modal';

describe('Modal component', () => {
  it('does not render when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={() => {}} title="Test Modal"><div>Content</div></Modal>);
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Modal"><div>Content inside modal</div></Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Content inside modal')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    render(<Modal isOpen={true} onClose={handleClose} title="Test Modal"><div>Content</div></Modal>);
    
    await userEvent.click(screen.getByLabelText('Close modal'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
