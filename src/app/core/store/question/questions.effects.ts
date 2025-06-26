import { inject, Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { filter, interval, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import * as QuestionActions from './question.actions';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as examSelectors from '@examStore/exam.selector';
import * as ExamActions from '@examStore/exam.actions';
import { QuestionService } from '../../../feature/question/services/question';
import { Store } from '@ngrx/store';

@Injectable()
export class QuestionsEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _questionsService = inject(QuestionService);
  private readonly _store = inject(Store);

  // mapping to a different action
  readonly loadQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      switchMap((action) =>
        this._questionsService.getAllQuestionOnExam(action.examId).pipe(
          tap((action) => console.log(action)),
          map((dataRes) => {
            tap((dataRes) => console.log('The data : ', dataRes));
            return QuestionActions.setQuestions({
              questions: dataRes.questions,
            });
          })
        )
      )
    )
  );

  readonly setQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setQuestions),
      map(() => {
        return ExamActions.updateExamStatus({ status: 'Started' });
      })
    )
  );

  readonly setQuestionEffect2$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setQuestions),
      withLatestFrom(this._store.select(QuestionSelectors.selectQuestions)),
      map(([, questionList]) =>
        QuestionActions.setCurrentQuestion({ question: questionList[0] })
      )
    )
  );
  readonly setWrongQuestionsEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(QuestionActions.setWrongQuestions),
      map(() => ExamActions.updateExamStatus({ status: 'Completed' }))
    )
  );
  timerEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ExamActions.startTimer),
      switchMap(({ duration }) =>
        interval(1000).pipe(
          withLatestFrom(this._store.select(examSelectors.examStatusSelector)),
          filter(([_, status]) => status === 'Started'),
          map(() => ExamActions.tickTimer()),
          takeUntil(
            this._actions$.pipe(
              ofType(ExamActions.timeEnd, ExamActions.resetExamStatus)
            )
          )
        )
      )
    )
  );

  tickEffect$ = createEffect(() =>
    this._actions$.pipe(
      ofType(ExamActions.tickTimer),
      withLatestFrom(this._store.select(examSelectors.examTimerSelector)),
      filter(([, timer]) => timer === 0),
      map(() => ExamActions.timeEnd())
    )
  );
}
