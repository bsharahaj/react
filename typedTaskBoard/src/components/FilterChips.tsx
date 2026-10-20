import type { StatusFilter } from '../types';
import { STATUSES, getStatusInfo } from '../status';

interface FilterChipsProps {
  value: StatusFilter;
  onChange: (filter: StatusFilter) => void;
}

// The chip list is built from the same Status union as everything else.
const FILTERS: readonly StatusFilter[] = ['all', ...STATUSES];

function filterLabel(filter: StatusFilter): string {
  // Narrowing: once 'all' is excluded, `filter` is a Status.
  return filter === 'all' ? 'All' : getStatusInfo(filter).label;
}

// Stretch 5: typed filter buttons.
export function FilterChips({ value, onChange }: FilterChipsProps) {
  return (
    <div className="chips" role="group" aria-label="Filter by status">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          className={filter === value ? 'chip active' : 'chip'}
          aria-pressed={filter === value}
          onClick={() => onChange(filter)}
        >
          {filterLabel(filter)}
        </button>
      ))}
    </div>
  );
}
