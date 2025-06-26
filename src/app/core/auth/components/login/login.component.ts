import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthusecaseService } from '../../domain/auth.usecase.';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authUseCase = inject(AuthusecaseService);
  private readonly router = inject(Router);
  public loginForm!: FormGroup;
  initForm() {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  loginSubmit() {
    if (this.loginForm.valid) {
      this.authUseCase.excuteLogin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.router.navigate(['/dashboard']);
            localStorage.setItem('token', res.token);
          }
        },
        error: (err) => console.log(err),
      });
    } else this.loginForm.markAllAsTouched();
  }
  ngOnInit(): void {
    this.initForm();
  }
}
