// ========================================
// TASK DETAIL MODAL COMPONENT
// ========================================

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task, updateTask, deleteTask } from '@/lib/api/tasks';
import { User } from '@/lib/api/users';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, data: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
  users: User[];
  currentUserId?: string;
}

export default function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  users,
  currentUserId,
}: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  if (!task) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTask({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
  };

  const handleSave = async () => {
    try {
      const response = await updateTask(task.id, editedTask);
      onUpdate(task.id, response.task);
      setIsEditing(false);
      toast.success('Task Updated!', {
        description: 'Task has been updated successfully',
      });
    } catch (err: any) {
      toast.error('Update Failed', {
        description: err.response?.data?.error || 'Please try again',
      });
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onDelete(task.id);
      onClose();
      toast.success('Task Deleted', {
        description: 'Task has been deleted successfully',
      });
    } catch (err: any) {
      toast.error('Delete Failed', {
        description: err.response?.data?.error || 'Please try again',
      });
      setIsDeleting(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'destructive';
      case 'HIGH': return 'default';
      case 'MEDIUM': return 'secondary';
      case 'LOW': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'default';
      case 'IN_PROGRESS': return 'secondary';
      case 'IN_REVIEW': return 'default';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl pr-8">
              {isEditing ? (
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="text-2xl font-bold"
                />
              ) : (
                task.title
              )}
            </DialogTitle>
            {!isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </Button>
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status & Priority Badges */}
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Select
                  value={editedTask.status}
                  onValueChange={(value: any) => setEditedTask({ ...editedTask, status: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">📋 To Do</SelectItem>
                    <SelectItem value="IN_PROGRESS">⚡ In Progress</SelectItem>
                    <SelectItem value="IN_REVIEW">👀 In Review</SelectItem>
                    <SelectItem value="COMPLETED">✅ Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={editedTask.priority}
                  onValueChange={(value: any) => setEditedTask({ ...editedTask, priority: value })}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">🟢 Low</SelectItem>
                    <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                    <SelectItem value="HIGH">🟠 High</SelectItem>
                    <SelectItem value="URGENT">🔴 Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </>
            ) : (
              <>
                <Badge variant={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <Badge variant={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </>
            )}
          </div>

          {/* Description */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Description</Label>
            {isEditing ? (
              <Input
                value={editedTask.description || ''}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                placeholder="Add a description..."
                className="mt-2"
              />
            ) : (
              <p className="mt-2 text-gray-600">{task.description || 'No description provided'}</p>
            )}
          </div>

          {/* Project */}
          {task.project && (
            <div>
              <Label className="text-sm font-semibold text-gray-700">Project</Label>
              <div className="mt-2 flex items-center gap-2">
                <div className="rounded-lg bg-blue-100 px-3 py-1">
                  <span className="text-sm font-medium text-blue-700">{task.project.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Assignee */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Assigned To</Label>
            {isEditing ? (
              <Select
                value={editedTask.assigneeId || ''}
                onValueChange={(value) => setEditedTask({ ...editedTask, assigneeId: value || undefined })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Unassigned</SelectItem>
                  {users.map((usr) => (
                    <SelectItem key={usr.id} value={usr.id}>
                      {usr.name} {usr.id === currentUserId ? '(You)' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="mt-2">
                {task.assignee ? (
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                      <span className="text-sm font-semibold text-purple-700">
                        {task.assignee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{task.assignee.name}</span>
                    {task.assignee.id === currentUserId && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Unassigned</span>
                )}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">Due Date</Label>
            {isEditing ? (
              <Input
                type="date"
                value={editedTask.dueDate || ''}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                className="mt-2"
                min={new Date().toISOString().split('T')[0]}
              />
            ) : (
              <p className="mt-2 text-gray-600">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : 'No due date set'}
              </p>
            )}
          </div>

          {/* Creator & Timestamps */}
          <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-medium">Created by:</span>
                <p className="mt-1">{task.creator?.name || 'Unknown'}</p>
              </div>
              <div>
                <span className="font-medium">Created:</span>
                <p className="mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-medium">Last updated:</span>
                <p className="mt-1">{new Date(task.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
