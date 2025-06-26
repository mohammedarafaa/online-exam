// register.component.ts
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthusecaseService } from './../../domain/auth.usecase.';
import { Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthBtnComponent } from "../../../../shared/auth-btn/auth-btn.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, AuthBtnComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authUseCase = inject(AuthusecaseService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  public registerForm!: FormGroup;

  // Validation error messages mapping (translation keys)
  public validationMessages: { [key: string]: { [key: string]: string } } = {
    username: {
      required: 'register.usernameRequired',
      pattern: 'register.usernamePattern',
    },
    firstName: {
      required: 'register.firstNameRequired',
      pattern: 'register.firstNamePattern',
    },
    lastName: {
      required: 'register.lastNameRequired',
      pattern: 'register.lastNamePattern',
    },
    email: {
      required: 'register.emailRequired',
      email: 'register.emailInvalid',
    },
    password: {
      required: 'register.passwordRequired',
      pattern: 'register.passwordPattern',
    },
    rePassword: {
      required: 'register.confirmPasswordRequired',
      pattern: 'register.passwordPattern',
    },
    phone: {
      required: 'register.phoneRequired',
      pattern: 'register.phonePattern',
    },
  };

  ngOnInit(): void {
    this.initForm();
  }
  // ...existing code...
  initForm() {
    this.registerForm = this.fb.group(
      {
        username: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_]{5,20}$/), // e.g., elevate11233
          ],
        ],
        firstName: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{2,19}$/), // e.g., Elevate
          ],
        ],
        lastName: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[A-Z][a-z]{2,19}$/), // e.g., Tech
          ],
        ],
        email: [
          null,
          [
            Validators.required,
            Validators.email, // e.g., admin133@1elevate.com
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/
            ), // e.g., Elevate@123
          ],
        ],
        rePassword: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/
            ),
          ],
        ],
        phone: [
          null,
          [
            Validators.required,
            Validators.pattern(/^01[0125][0-9]{8}$/), // e.g., 01094155711
          ],
        ],
      },
      { validator: this.confirmPassword }
    );
  }
  // ...existing code...

  confirmPassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password === rePassword ? null : { misMatched: true };
  }

  // Helper method to check if field has error and is touched
  hasError(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Helper method to get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field && field.errors) {
      const firstError = Object.keys(field.errors)[0];
      const key = this.validationMessages[fieldName]?.[firstError];
      if (key) {
        return this.translate.instant(key);
      }
      return this.translate.instant('register.invalidInput');
    }
    return '';
  }

  // Helper method to check password mismatch
  hasPasswordMismatch(): boolean {
    return !!(
      this.registerForm.errors?.['misMatched'] &&
      this.registerForm.get('rePassword')?.touched
    );
  }

  registerSubmit() {
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.authUseCase.excuteRegister(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => console.log(err),
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
