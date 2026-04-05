import { render, screen } from '@testing-library/react';
import { ApplicationStatus } from '@job-tracker/types';
import { JobList } from './JobList';

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

const mockJob2 = {
  ...mockJob,
  id: '2',
  company: 'Beta Inc',
  role: 'Software Engineer',
  status: ApplicationStatus.Interview,
};

describe('JobList', () => {
  it('renders company and role for each job', () => {
    render(<JobList jobs={[mockJob, mockJob2]} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('shows empty state when given no jobs', () => {
    render(<JobList jobs={[]} />);
    expect(screen.getByText('No jobs found.')).toBeInTheDocument();
  });
});
