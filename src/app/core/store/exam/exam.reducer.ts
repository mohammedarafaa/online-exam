import { createReducer, on } from "@ngrx/store";
import { examInitalState, examStatus } from "./exam.state";
import * as ExamActions from "./exam.actions";

export const examReducer = createReducer(
  examInitalState,
  on(ExamActions.toggleModal, (state) => ({
    ...state,
    isModalOpen: !state.isModalOpen
  })),
  on(ExamActions.resetExamStatus, () => examInitalState),
  on(ExamActions.updateExamStatus, (state, { status }) => ({
    ...state,
    examStatus: status
  })),
  on(ExamActions.startTimer, (state, { duration }) => ({
    ...state,
    duration,
    timer: duration - 1
  })),
  on(ExamActions.tickTimer, (state) => ({
    ...state,
    timer: state.timer !== null ? state.timer - 1 : null
  })),
  on(ExamActions.timeEnd, (state) => ({
    ...state,
    examStatus: 'Time End' as examStatus
  }))
);
