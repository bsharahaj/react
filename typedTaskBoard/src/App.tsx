import { useState } from 'react';
import type { NewTask, StatusFilter, Task } from './types';
import { advanceTask, isTaskArray } from './status';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AddTaskForm } from './components/AddTaskForm';
import { SummaryBanner } from './components/SummaryBanner';
import { FilterChips } from './components/FilterChips';
import { List } from './components/List';
import { TaskCard } from './components/TaskCard';

const SAMPLE_TASKS: Task[] = [
  { id: 1, title: 'Write the report', status: 'todo' },
  { id: 2, title: 'Review the PR', status: 'doing', priority: 'high' },
  { id: 3, title: 'Ship the release', status: 'done' },
];

export default function App() {
  // The task list. It is saved to localStorage (stretch 4) and only loaded
  // back if the isTaskArray guard confirms the stored data is valid.
  const [tasks, setTasks] = useLocalStorage<Task[]>('typed-task-board', SAMPLE_TASKS, isTaskArray);

  // Which status the list is filtered to (stretch 5). Annotated because
  // 'all' on its own would be inferred as plain string.
  const [filter, setFilter] = useState<StatusFilter>('all');

  // Turn a NewTask into a real Task by giving it the next free id.
  function handleAdd(newTask: NewTask) {
    setTasks((prev) => {
      const nextId = prev.reduce((max, t) => Math.max(max, t.id), 0) + 1;
      return [...prev, { ...newTask, id: nextId }];
    });
  }

  function handleAdvance(id: number) {
    setTasks((prev) => prev.map((t) => (t.id === id ? advanceTask(t) : t)));
  }

  function handleRemove(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const visibleTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <main className="app">
      <h1>Typed Task Board</h1>
      <AddTaskForm onAdd={handleAdd} />
      <SummaryBanner tasks={tasks} />
      <FilterChips value={filter} onChange={setFilter} />
      {/* List<Task> is inferred from `items`; renderItem receives a Task. */}
      <List
        className="task-list"
        items={visibleTasks}
        getKey={(task) => task.id}
        emptyMessage={filter === 'all' ? 'No tasks yet. Add one above.' : 'No tasks with this status.'}
        renderItem={(task) => (
          <TaskCard task={task} onAdvance={handleAdvance} onRemove={handleRemove} />
        )}
      />
    </main>
  );
}
