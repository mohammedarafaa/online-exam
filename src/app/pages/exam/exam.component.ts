import { Component } from '@angular/core';
import { ExamContainerComponent } from "../../feature/exam/components/exam-container/exam-container.component";

@Component({
  selector: 'app-exam',
  imports: [ExamContainerComponent],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {

}
