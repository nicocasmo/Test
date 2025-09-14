export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  name: string;
  subtasks: Subtask[];
}
