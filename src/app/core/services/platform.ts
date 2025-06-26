import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}
  checkPlatform(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true;
    } else return false;
  }
}
