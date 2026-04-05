import { render, screen } from '@testing-library/react';
import { ApplicationStatus } from '@job-tracker/types';
import { JobCard } from './JobCard';

const mockJob = {
  id: '1',
  userId: 'user-1',
  company: 'Acme',
  role: 'Full Stack Developer',
  status: ApplicationStatus.Applied,
  appliedAt: new Date(),
  notes: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('JobCard', () => {
  it('renders the company and role', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
  });

  it('renders the status badge', () => {
    render(<JobCard job={mockJob} />);
    expect(screen.getByText('Applied')).toBeInTheDocument();
  });
});
