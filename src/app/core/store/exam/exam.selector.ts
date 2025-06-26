import { IexamIntialState } from './exam.state';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const examFeatureSelector = createFeatureSelector<IexamIntialState>('exam');
export const examModalSelector = createSelector(examFeatureSelector, (state) => state.isModalOpen);
export const examStatusSelector = createSelector(examFeatureSelector, (state) => state.examStatus);
export const examTimerSelector = createSelector(examFeatureSelector, (state) => state.timer);
export const examDurationSelector = createSelector(examFeatureSelector, (state) => state.duration);
