import type { Task } from '../types';
import { STATUSES, countByStatus, getStatusInfo } from '../status';

interface SummaryBannerProps {
  tasks: readonly Task[];
}

// R8: counts are calculated from the tasks passed in, so they update
// automatically after every add, advance or remove.
export function SummaryBanner({ tasks }: SummaryBannerProps) {
  const counts = countByStatus(tasks);

  return (
    <div className="summary" aria-live="polite">
      {STATUSES.map((status) => (
        <div key={status} className={`summary-item ${status}`}>
          <span className="summary-count">{counts[status]}</span>
          <span className="summary-label">{getStatusInfo(status).label}</span>
        </div>
      ))}
    </div>
  );
}
