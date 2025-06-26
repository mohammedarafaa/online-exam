import { createAction, props } from "@ngrx/store";
import { examStatus } from "./exam.state";

export const toggleModal = createAction('[Exam] Toggle Modal');
export const resetExamStatus = createAction('[Exam] Reset Status');
export const updateExamStatus = createAction('[Exam] Update Status', props<{status: examStatus}>());
export const startTimer = createAction('[Exam] Start Timer', props<{ duration: number }>());
export const tickTimer = createAction('[Exam] Tick Timer');
export const timeEnd = createAction('[Exam] Time End');
