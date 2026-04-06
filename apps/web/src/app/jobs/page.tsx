import { JobList } from '@/components/JobList';
import { ApplicationStatus } from '@job-tracker/types';

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

const mockJobs = [mockJob, mockJob2];

export default function JobsPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <JobList jobs={mockJobs} />
    </main>
  );
}
