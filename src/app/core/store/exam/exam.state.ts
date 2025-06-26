export type examStatus = 'Not Started'| 'Started' | 'Completed'|'Reviewed'|'Closed'|'Time End'
export interface IexamIntialState {
  isModalOpen: boolean;
  examStatus: examStatus;
  timer: number | null; // seconds left
  duration: number | null; // total seconds
}
export const examInitalState: IexamIntialState = {
  isModalOpen: false,
  examStatus: 'Not Started',
  timer: null,
  duration: null,
};
