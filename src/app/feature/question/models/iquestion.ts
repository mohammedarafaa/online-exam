
import { Iexam } from '../../exam/models/iexam';
import { Isubject } from '../../subject/models/isubject';

export interface Answer {
  answer: string;
  key: string;
}

export interface Iquestion {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Isubject;
  exam: Iexam;
  createdAt: string;
}

export interface QuestionAdapt {
  answers: Answer[];
  _id: string;
  index: number;
  question: string;
  correct: string;
  selectedAnswer?: string;
}

export interface QuestionsResponse {
  message: string;
  questions: Iquestion[];
}

export interface QuestionsAdaptResponse {
  message: string;
  questions: QuestionAdapt[];
}

export interface WrongQuestion {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: {};
}

export interface CheckedQuestionResponse {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: Iquestion[];
}
