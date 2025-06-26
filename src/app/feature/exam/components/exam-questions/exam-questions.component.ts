import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { QuestionAdapt } from '../../../question/models/iquestion';
import { Store } from '@ngrx/store';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as examSelectors from '@examStore/exam.selector';
import * as QuestionActions from '@questionStore/question.actions';
import * as ExamActions from '@examStore/exam.actions';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-exam-questions',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './exam-questions.component.html',
  styleUrl: './exam-questions.component.scss',
})
export class ExamQuestionsComponent {
  private readonly _store = inject(Store);
  private readonly _fb = inject(FormBuilder);
  public numOfQuestions$!: Observable<number>;
  public numOfQuestions!: number;
  public currentQuestionObj$!: Observable<QuestionAdapt | null>;
  public currentQuestionObj!: QuestionAdapt | null;
  public q!: QuestionAdapt[] | null;
  timer$!: Observable<number | null>;
  isBackBtnDisabled: WritableSignal<boolean> = signal(true);
  isNextBtnDisabled: WritableSignal<boolean> = signal(true);
  quizForm!: FormGroup;
  enableNextBtn() {
    this.isNextBtnDisabled.set(false);
  }

  disableNextBtn() {
    this.isNextBtnDisabled.set(true);
  }

  enableBackBtn() {
    this.isBackBtnDisabled.set(false);
  }

  disableBackBtn() {
    this.isBackBtnDisabled.set(true);
  }

  trackNumberofAllQuestions() {
    this.numOfQuestions$ = this._store.select(
      QuestionSelectors.selectNumberOfQuestions
    );
  }
  trackNumberofAllQuestionsWithOutAsyncPipe() {
    this._store.select(QuestionSelectors.selectNumberOfQuestions).subscribe({
      next: (data) => (this.numOfQuestions = data),
    });
  }
  generateRange(num: number) {
    return num ? [...Array(num).keys()] : [];
  }
  trackExamTimer() {
    this.timer$ = this._store.select(examSelectors.examTimerSelector);
  }
  trackCurrentQuestion() {
    this.currentQuestionObj$ = this._store.select(
      QuestionSelectors.selectCurrentQuestion
    );
  }
  trackCurrentQuestionWithOutAsyncPipe() {
    this._store.select(QuestionSelectors.selectCurrentQuestion).subscribe({
      next: (data) => (this.currentQuestionObj = data),
    });
  }
  initForm() {
    this.quizForm = this._fb.group({
      selectedAnswer: [null],
    });
  }
  test() {
    this._store.select(QuestionSelectors.selectQuestions).subscribe({
      next: (data) => (this.q = data),
    });
  }
  showReport() {
     this._store.dispatch(QuestionActions.setWrongQuestions());
    this._store.dispatch(ExamActions.updateExamStatus({ status: 'Completed' }));
  }
 onNext() {
  // get selected answer
  const selectedAnswer = this.quizForm.get('selectedAnswer')?.value;
  // update question answer as action
  this._store.dispatch(
    QuestionActions.updateQuestion({
      questionId: this.currentQuestionObj?._id!,
      selectedAnswer: selectedAnswer,
    })
  );

  // If this is the last question, show report and return
  if (this.currentQuestionObj?.index === this.numOfQuestions - 1) {
    this.showReport();
    return;
  }

  // update to the next Question
  this._store.dispatch(
    QuestionActions.onNext({
      currentIndex: this.currentQuestionObj?.index!,
    })
  );
  // disable next btn
  this.disableNextBtn();
  // enable back btn
  this.enableBackBtn();
  // check if question answered or not
  if (this.currentQuestionObj?.selectedAnswer) {
    this.enableNextBtn();
    this.quizForm
      .get('selectedAnswer')
      ?.setValue(this.currentQuestionObj.selectedAnswer);
  } else {
    this.disableNextBtn();
    this.quizForm.get('selectedAnswer')?.setValue(null);
  }
}
  onBack() {
    if ((this.currentQuestionObj?.index ?? 0) <= 1) {
      this.disableBackBtn();
    } else {
      this.enableBackBtn();
    }
    this.enableNextBtn();
    this._store.dispatch(
      QuestionActions.onBack({
        currentIndex: this.currentQuestionObj?.index!,
      })
    );

    this.quizForm
      .get('selectedAnswer')
      ?.setValue(this.currentQuestionObj?.selectedAnswer);
  }

  onSelectAnswer() {
    this.enableNextBtn();
    // Immediately update the selected answer visually and in the store
    const selectedAnswer = this.quizForm.get('selectedAnswer')?.value;
    if (this.currentQuestionObj) {
      this.currentQuestionObj.selectedAnswer = selectedAnswer;
    }
    // Dispatch update to store so selector emits new value and UI updates
    if (this.currentQuestionObj?._id) {
      this._store.dispatch(
        QuestionActions.updateQuestion({
          questionId: this.currentQuestionObj._id,
          selectedAnswer: selectedAnswer,
        })
      );
    }
  }
  ngOnInit(): void {
    this.trackNumberofAllQuestions();
    this.trackCurrentQuestion();
    this.trackCurrentQuestionWithOutAsyncPipe();
    this.trackNumberofAllQuestionsWithOutAsyncPipe();
    this.initForm();
    this.trackExamTimer();
    this.test();
  }
}
