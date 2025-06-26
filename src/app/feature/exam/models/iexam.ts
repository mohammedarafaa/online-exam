export interface Iexam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface ExamsResponse {
  message: string;
  metadata: Metadata;
  exams: Iexam[];
}

export interface ExamsAdaptResponse {
  message: string;
  exams: Iexam[];
}
export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
