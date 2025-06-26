import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ApiBaseUrl } from '../../../core/utility/base.url';
import { ExamsResponse } from '../models/iexam';
import { ExamEndPoints } from '../end_points/exam.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(
    private _httpClient: HttpClient,
    @Inject(ApiBaseUrl) private readonly apiBaseUrl: string
  ) {}
  getAllExamsOnSubject(subjectId: string): Observable<ExamsResponse> {
    return this._httpClient.get<ExamsResponse>(
      this.apiBaseUrl + ExamEndPoints.allExamOnSubject + `${subjectId}`
    );
  }
}
