import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Iexam } from '../../models/iexam';
import { ExamService } from '../../services/exam';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ExamCardComponent } from "../exam-card/exam-card.component";
import { examStatus } from '@examStore/exam.state';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ExamSelectors from '@examStore/exam.selector'
import { AsyncPipe } from '@angular/common';
import { ModalComponent } from "../../../../shared/modal/modal.component";
import { ExamQuestionsComponent } from "../exam-questions/exam-questions.component";
import { ExamScoreComponent } from "../exam-score/exam-score.component";
import { ExamSummaryComponent } from "../exam-summary/exam-summary.component";
import { TimeEndComponent } from "../time-end/time-end.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-exam-container',
  imports: [ExamCardComponent, RouterLink, AsyncPipe, ModalComponent, ExamQuestionsComponent, ExamScoreComponent, ExamSummaryComponent, TimeEndComponent, TranslateModule],
  templateUrl: './exam-container.component.html',
  styleUrl: './exam-container.component.scss',
})
export class ExamContainerComponent {
  public exams: WritableSignal<Iexam[]> = signal([]);
  private readonly _examsService = inject(ExamService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _store = inject(Store);
  isOpen!: Observable<boolean>;
  status!:Observable<examStatus>
  getSubjectId() {
    this._activatedRoute.paramMap.subscribe({
      next: (p) => {
        this._examsService.getAllExamsOnSubject(p.get('subjectId')!).subscribe({
          next: (res) => {
            console.log('exams', res), this.exams.set(res.exams);
          },
        });
      },
    });
  }
  trackExamModal()
  {
    this.isOpen = this._store.select(ExamSelectors.examModalSelector);
  }
  trackExamStatus()
  {
    this.status = this._store.select(ExamSelectors.examStatusSelector);
  }
  ngOnInit(): void {
    this.getSubjectId();
    this.trackExamModal();
    this.trackExamStatus()
  }
}
