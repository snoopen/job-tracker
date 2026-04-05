import type { Job } from '@job-tracker/types';
import { StatusBadge } from './StatusBadge';

type Props = {
  job: Job;
};

export function JobCard({ job }: Props) {
  return (
    <div className="p-4 border border-zinc-300 flex items-center justify-between gap-4">
      <div>
        <h2 className="font-semibold text-lg">{job.company}</h2>
        <p className="text-sm text-gray-600">{job.role}</p>
      </div>
      <StatusBadge status={job.status} />
    </div>
  );
}
