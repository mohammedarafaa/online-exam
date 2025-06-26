import { Component, input, InputSignal } from '@angular/core';
import { Isubject } from '../../models/isubject';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-subject-card',
  imports: [RouterLink, TranslateModule],
  templateUrl: './subject-card.component.html',
  styleUrl: './subject-card.component.scss',
})
export class SubjectCardComponent {
  subject: InputSignal<Isubject> = input.required<Isubject>({});
}
