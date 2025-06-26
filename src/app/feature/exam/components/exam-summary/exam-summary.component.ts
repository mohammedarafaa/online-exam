import { Component, inject, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionAdapt } from '../../../question/models/iquestion';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as QuestionActions from '@questionStore/question.actions';
import * as ExamActions from '@examStore/exam.actions';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-exam-summary',
  imports: [AsyncPipe, TranslateModule],
  templateUrl: './exam-summary.component.html',
  styleUrl: './exam-summary.component.scss',
})
export class ExamSummaryComponent implements OnInit {
  wrongQuestions: QuestionAdapt[] = [] as QuestionAdapt[];
  wrongQuestions$!: Observable<QuestionAdapt[]>;
   numOfQuestions = signal(0);
  private readonly _store = inject(Store);

  getWrongQuestions() {
    this._store.select(QuestionSelectors.selectWrongQuestions).subscribe({
      next: (dataList) => {
        this.wrongQuestions = dataList;
      },
    });

    this.wrongQuestions$ = this._store.select(
      QuestionSelectors.selectWrongQuestions
    );
  }

    getQuestionsNum() {
      this._store
        .select(QuestionSelectors.selectNumberOfQuestions)
        .subscribe({
          next: (value) => {
            this.numOfQuestions.set(value);
          },
        });
    }

  closeModal() {
    // Clear Exam State
    this._store.dispatch(ExamActions.resetExamStatus());
    //Clear Question State
    this._store.dispatch(QuestionActions.resetQuestionState());
  }
  getAnswerClasses(questionObj: any, answer: any): string {
  const baseClasses = 'flex items-center p-4 rounded-2xl border-2 transition-all duration-200';

  if (answer.key === questionObj.correct) {
    // Correct answer styling
    return `${baseClasses} bg-green-50 border-green-200 shadow-sm`;
  } else if (questionObj.selectedAnswer === answer.key) {
    // User's incorrect answer styling
    return `${baseClasses} bg-red-50 border-red-200 shadow-sm`;
  } else {
    // Neutral answer styling
    return `${baseClasses} bg-gray-50 border-gray-200 hover:border-gray-300`;
  }
}

  ngOnInit(): void {
    this.getWrongQuestions();
    this. getQuestionsNum()
  }
}
