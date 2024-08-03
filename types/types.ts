export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  text?: string;
  time: number;
  title: string;
  type: string;
  url?: string;
}

export interface FormState {
  name: string;
  email: string;
  feedback: string;
}

export interface ErrorState {
  name: string;
  email: string;
  feedback: string;
  form?: string;
}

export interface FeedbackFormProps {
  form: {
    name: string;
    email: string;
    feedback: string;
  };
  errors: {
    name?: string;
    email?: string;
    feedback?: string;
    form?: string;
  };
  successMessage: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface CommentType {
  id: number;
  by: string;
  text: string;
  time: number;
  kids?: CommentType[];
}
