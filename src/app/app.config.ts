import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgChartsModule } from 'ng2-charts';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ApiBaseUrl } from './core/utility/base.url';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthRepo } from './core/auth/domain/auth.repo';
import { AuthdatalayerService } from './core/auth/data_layer/auth.datalayer';
import { HeaderInterceptor } from './core/interceptors/headers';
import { loadingInterceptor } from './core/interceptors/loading';
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideToastr } from 'ngx-toastr';
import { errorsInterceptor } from './core/interceptors/errors';
import { examReducer } from '@examStore/exam.reducer';
import { questionReducer } from '@questionStore/question.reducer';
import { QuestionsEffects } from '@questionStore/questions.effects';
 import { TranslateHttpLoader } from '@ngx-translate/http-loader';
 import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, './i18n/', '.json');
 }
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(),withInterceptors([HeaderInterceptor,loadingInterceptor,errorsInterceptor])),
    {
      provide: ApiBaseUrl,
      useValue: 'https://exam.elevateegy.com/',
    },
    { provide: AuthRepo,
      useClass: AuthdatalayerService
    },provideToastr(),
    importProvidersFrom( NgxSpinnerModule),
     provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgChartsModule),
    provideClientHydration(withEventReplay()),
    provideStore({
      exam:examReducer,
      question:questionReducer
    }),importProvidersFrom(
       TranslateModule.forRoot({
         loader: {
           provide: TranslateLoader,
           useFactory: HttpLoaderFactory,
           deps: [HttpClient]
         }
       })
     ),
    provideEffects(QuestionsEffects),
  ],
};
