import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';
import { ApplicationStatus } from '@job-tracker/types';

describe('StatusBadge', () => {
  it('renders the status text', () => {
    render(<StatusBadge status={ApplicationStatus.Applied} />);
    expect(screen.getByText('Applied')).toBeInTheDocument();
  });

  it('applies a different colour class per status', () => {
    const { rerender } = render(<StatusBadge status={ApplicationStatus.Applied} />);
    const badge = screen.getByText('Applied');
    const appliedClass = badge.className;

    rerender(<StatusBadge status={ApplicationStatus.Rejected} />);
    const rejectedClass = screen.getByText('Rejected').className;

    expect(appliedClass).not.toBe(rejectedClass);
  });
});
