import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthdatalayerService } from '../../data_layer/auth.datalayer';
import { AuthBtnComponent } from '../../../../shared/auth-btn/auth-btn.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetpasswordComponent implements OnInit {
  public step: WritableSignal<number> = signal(0);
  private readonly fb = inject(FormBuilder);
  private readonly authDataLayer = inject(AuthdatalayerService);
  private readonly router = inject(Router);
  public forgetPasswordForm!: FormGroup;
  public verifyCodeForm!: FormGroup;
  public resetPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: [null, Validators.required],
    });
    this.verifyCodeForm = this.fb.group({
      resetCode: [null, Validators.required],
    });
    this.resetPasswordForm = this.fb.group({
      email: [null, Validators.required],
      newPassword: [null, Validators.required],
    });
  }
  fogetPasswordSubmit() {
    if (this.forgetPasswordForm.valid) {
      this.authDataLayer
        .forgetPassword(this.forgetPasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.step.set(1);
              this.resetPasswordForm
                .get('email')
                ?.patchValue(this.forgetPasswordForm.get('email')?.value);
            }
          },
          error: (err) => console.log(err),
        });
    } else this.forgetPasswordForm.markAllAsTouched();
  }
  verifyCodeSubmit() {
    if (this.verifyCodeForm.valid) {
      this.authDataLayer.verifyCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.step.set(2);
          }
        },
      });
    } else this.verifyCodeForm.markAllAsTouched();
  }
  resetPasswordSubmit() {
    if (this.resetPasswordForm.valid) {
      this.authDataLayer.resetPassword(this.resetPasswordForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', res.token);
          }
        },
      });
    } else this.verifyCodeForm.markAllAsTouched();
  }
}
