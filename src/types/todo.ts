export type Priority = 'Yüksek' | 'Orta' | 'Düşük';

export interface Todo {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: Priority;
  dueDate?: string;
  completed: boolean;
  createdAt?: string;
  tags: string[];
} 