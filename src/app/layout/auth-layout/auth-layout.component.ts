import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, RouterLink, TranslatePipe, CommonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  languages = ['en', 'ar']; // Add your supported languages here
  currentLang: string;
  dropdownOpen = false;

  constructor(private translate: TranslateService,
    private translationService:TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    translate.setDefaultLang('en');
    this.currentLang = translate.currentLang || translate.getDefaultLang();
  }
  switchLang(lang: string) {
    this.translationService.changeLang(lang);
    this.currentLang = lang;
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Set initial direction and lang from localStorage or default
      const lang = localStorage.getItem('lng') || 'en';
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }
  changeLang(lang: string) {
     this.translationService.changeLang(lang);
     this.currentLang = lang;
   }
}
