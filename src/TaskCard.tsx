// TaskCard.tsx

import React from 'react';

interface TaskCardProps {
  title: string;
  dueDate?: string;
  completedAtDate?: string;
  assigneeName: string;
  status: 'pending' | 'done';
}

const TaskCard: React.FC<TaskCardProps> = ({ title, dueDate, completedAtDate, assigneeName, status }) => {
  return (
    <div className="TaskItem bg-white shadow p-3 rounded border mb-2">
      <h2 className="text-md font-bold text-gray-800">{title}</h2>

      {/* Conditional rendering for dueDate (pending tasks) */}
      {status === 'pending' && dueDate && (
        <p className="text-sm text-gray-600">Due on: {dueDate}</p>
      )}

      {/* Conditional rendering for completedAtDate (done tasks) */}
      {status === 'done' && completedAtDate && (
        <p className="text-sm text-gray-600">Completed on: {completedAtDate}</p>
      )}

      {/* Rendering assignee name */}
      <p className="text-sm text-gray-600">Assignee: {assigneeName}</p>
    </div>
  );
};

export default TaskCard;
