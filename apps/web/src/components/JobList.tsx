import type { Job } from '@job-tracker/types';
import { JobCard } from './JobCard';

type Props = {
  jobs: Job[];
};

export function JobList({ jobs }: Props) {
  if (jobs.length === 0) {
    return <p>No jobs found.</p>;
  }
  return (
    <ul className="flex flex-col gap-4 max-w-sm">
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
