// Single source of truth for the domain types (R1, R2).
// Every component imports from here instead of re-declaring shapes.

// The only three valid statuses.
export type Status = 'todo' | 'doing' | 'done';

export type Priority = 'low' | 'high';

export interface Task {
  readonly id: number;
  title: string;
  status: Status;
  priority?: Priority; // optional
}

// A task the form has created but that has no id yet.
// Derived from Task with a utility type (stretch 2) so it can never drift
// out of sync with the real Task shape.
export type NewTask = Omit<Task, 'id'>;

// What the filter chips can select: one status, or everything (stretch 5).
export type StatusFilter = Status | 'all';

// Per-status counts for the summary banner. Record<Status, number> forces
// a key for every status: adding a fourth status breaks this until handled.
export type StatusCounts = Record<Status, number>;
