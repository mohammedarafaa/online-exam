import { Inject, inject, Injectable } from '@angular/core';
import { MainAPIAdapter } from '../../../core/adapter/main.adapter';
import { HttpClient } from '@angular/common/http';
import { QuestionsAdaptResponse, QuestionsResponse } from '../models/iquestion';
import { map, Observable } from 'rxjs';
import { ApiBaseUrl } from '../../../core/utility/base.url';
import { QuestionEndPoints } from '../end_points/question.endpoints';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private readonly _mainAPIAdapter = inject(MainAPIAdapter);
  constructor(
    private _httpClient: HttpClient,
    @Inject(ApiBaseUrl) private readonly apiBaseUrl: string
  ) {}

  getAllQuestionOnExam(examId: string): Observable<QuestionsAdaptResponse> {
    return this._httpClient
      .get<QuestionsResponse>(
        this.apiBaseUrl + QuestionEndPoints.allQuestionsOnExam + `${examId}`
      )
      .pipe(
        map((res: QuestionsResponse) => {
          return this._mainAPIAdapter.questionAdapter(res);
        })
      );
  }
}
