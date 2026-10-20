import type { Key, ReactNode } from 'react';

// R5: one genuinely generic component. T is inferred from `items`, and
// `renderItem` / `getKey` receive that same T, so it works for tasks,
// strings, or anything else without losing type information.
interface ListProps<T> {
  items: readonly T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => Key;
  emptyMessage?: string;
  className?: string;
}

export function List<T>({
  items,
  renderItem,
  getKey,
  emptyMessage = 'Nothing here yet.',
  className,
}: ListProps<T>) {
  if (items.length === 0) {
    return <p className="empty">{emptyMessage}</p>;
  }
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
