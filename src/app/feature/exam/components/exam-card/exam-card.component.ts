import * as ExamActions from '@examStore/exam.actions';
import * as QuestionActions from '@questionStore/question.actions';
import { Component, inject, input, InputSignal } from '@angular/core';
import { Iexam } from '../../models/iexam';
import { Store } from '@ngrx/store';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-exam-card',
  imports: [RouterLink, TranslateModule],
  templateUrl: './exam-card.component.html',
  styleUrl: './exam-card.component.scss',
})
export class ExamCardComponent {
  exam: InputSignal<Iexam> = input.required<Iexam>({});
  private readonly _store = inject(Store);
  startExam() {
    this._store.dispatch(ExamActions.toggleModal());
    this._store.dispatch(
      ExamActions.startTimer({ duration: 1140})
    );
  }
  loadQuestions(ExamId: string) {
    this._store.dispatch(
      QuestionActions.loadQuestions({
        examId: ExamId,
      })
    );
  }
}
