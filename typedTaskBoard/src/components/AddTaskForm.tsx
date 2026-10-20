import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { NewTask, Priority } from '../types';

interface AddTaskFormProps {
  onAdd: (task: NewTask) => void;
}

// The <select> also allows "no priority", so its state is Priority | ''.
type PriorityChoice = Priority | '';

// Narrow the raw string from the <select> to our union with a real check.
function toPriorityChoice(value: string): PriorityChoice {
  return value === 'low' || value === 'high' ? value : '';
}

// R4: a controlled form. The input's value always comes from state.
export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  // Inferred as string from the initial value; no annotation needed.
  const [title, setTitle] = useState('');
  // Annotated because '' alone would be inferred as just string.
  const [priority, setPriority] = useState<PriorityChoice>('');

  // Typed change events, parameterised by the element they come from.
  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handlePriorityChange(e: ChangeEvent<HTMLSelectElement>) {
    setPriority(toPriorityChoice(e.target.value));
  }

  // Typed submit event for the <form>.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stay on the page
    const trimmed = title.trim();
    if (trimmed === '') return;

    // New tasks always start as "todo". No id yet, so this is a NewTask.
    const task: NewTask = { title: trimmed, status: 'todo' };
    onAdd(priority === '' ? task : { ...task, priority });

    setTitle(''); // input clears after adding
    setPriority('');
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task title"
        value={title}
        onChange={handleTitleChange}
        aria-label="New task title"
      />
      <select value={priority} onChange={handlePriorityChange} aria-label="Priority">
        <option value="">No priority</option>
        <option value="low">Low</option>
        <option value="high">High</option>
      </select>
      <button type="submit" disabled={title.trim() === ''}>
        Add
      </button>
    </form>
  );
}
