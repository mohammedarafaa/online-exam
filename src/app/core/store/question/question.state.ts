

import { QuestionAdapt } from "../../../feature/question/models/iquestion";

export interface QuestionState {
  questions: QuestionAdapt[]; // List all question that related to the EXAM ID
  currentQuestion: QuestionAdapt | null; // To Display the Current Question
  wrongQuestions: QuestionAdapt[]; // To list all wrong answered questions
  numberOfQuestions: number; // Number of all questions
  numberOfWrongQuestions: number; // Number of all wrong questions
}
