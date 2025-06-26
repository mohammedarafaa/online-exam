import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAllSubjectRes} from '../models/isubject';
import { ApiBaseUrl } from '../../../core/utility/base.url';
import { SubjectEndPoints } from '../end_points/subject.endpoints';
@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  constructor(
    private httpClient: HttpClient,
    @Inject(ApiBaseUrl) private readonly apiBaseUrl: string
  ) {}

  getAllSubjects(): Observable<IAllSubjectRes> {
    return this.httpClient.get<IAllSubjectRes>(
      this.apiBaseUrl + SubjectEndPoints.getall
    );
  }

  getLimitedSubjects(): Observable<IAllSubjectRes> {
    return this.httpClient.get<IAllSubjectRes>(
      this.apiBaseUrl + SubjectEndPoints.getlimited
    );
  }
}
