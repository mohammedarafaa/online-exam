import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { AuthdatalayerService } from '../../core/auth/data_layer/auth.datalayer';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, TranslateModule, TranslatePipe],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  private readonly _authDataLayerService = inject(AuthdatalayerService);
  private readonly _router = inject(Router);
  private readonly translate = inject(TranslateService);
  dir = 'ltr';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('lng') || 'en';
      this.dir = lang === 'ar' ? 'rtl' : 'ltr';
      this.translate.use(lang);
    }
  }

  logOut(): void {
    this._authDataLayerService.logout().subscribe({
      next: (res) => {
        console.log('Logout successful:', res);
        this._router.navigate(['/login']);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('token');
        }
      }
    });
  }
}
