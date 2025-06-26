import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SubjectCardComponent } from '../subject-card/subject-card.component';
import { SubjectsService } from '../../services/subject';
import { Isubject } from '../../models/isubject';

@Component({
  selector: 'app-subject-container',
  imports: [SubjectCardComponent],
  templateUrl: './subject-container.component.html',
  styleUrl: './subject-container.component.scss',
})
export class SubjectContainerComponent {
  private readonly _subjectsService = inject(SubjectsService);
  public allSubjects: WritableSignal<Isubject[]> = signal([]);
  getLimitedSubjects(): void {
    this._subjectsService.getLimitedSubjects().subscribe({
      next: (res) => {
        console.log('Limitsubjects', res);
        this.allSubjects.set(res.subjects);
      },
    });
  }
  ngOnInit(): void {
    this.getLimitedSubjects();
  }
}
