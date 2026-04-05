import { ApplicationStatus } from '@job-tracker/types';

type Props = {
  status: ApplicationStatus;
};

const colorMap: Record<ApplicationStatus, string> = {
  [ApplicationStatus.Saved]: 'bg-gray-100 text-gray-800',
  [ApplicationStatus.Applied]: 'bg-blue-100 text-blue-800',
  [ApplicationStatus.Interview]: 'bg-fuchsia-100 text-fuchsia-800',
  [ApplicationStatus.Offer]: 'bg-green-100 text-green-800',
  [ApplicationStatus.Rejected]: 'bg-red-100 text-red-800',
};

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function StatusBadge({ status }: Props) {
  return (
    <span className={`${colorMap[status]} px-3 py-1 rounded-full text-sm font-medium`}>
      {capitalise(status)}
    </span>
  );
}
