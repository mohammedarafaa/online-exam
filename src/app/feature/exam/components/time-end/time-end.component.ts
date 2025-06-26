import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ExamActions from '@examStore/exam.actions';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-time-end',
  imports: [TranslateModule],
  templateUrl: './time-end.component.html',
  styleUrl: './time-end.component.scss'
})
export class TimeEndComponent {
private readonly _store = inject(Store);
  showReview() {
    this._store.dispatch(ExamActions.updateExamStatus({ status: 'Reviewed' }));
  }
}
