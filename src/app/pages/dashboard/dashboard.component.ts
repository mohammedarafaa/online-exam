import { Component } from '@angular/core';
import { SubjectContainerComponent } from "../../feature/subject/components/subject-container/subject-container.component";

@Component({
  selector: 'app-dashboard',
  imports: [SubjectContainerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
