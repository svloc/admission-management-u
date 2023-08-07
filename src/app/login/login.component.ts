import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public isLogin: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLoginForm();
    this.loadSignupForm();
  }

  loadLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  loadSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['',[Validators.required,Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$')]],
      associateName: ['',[Validators.required, Validators.pattern('^[A-Za-z ]{3,}$')]],
      associateAddress: ['', Validators.required],
      associateEmailId: ['', [Validators.required, Validators.email]]
    });

    this.signupForm.get('associateEmailId').valueChanges.subscribe((email: string) => {
      const username = this.extractUsernameFromEmail(email);
      this.signupForm.get('username').setValue(username);
    });
  }
  private extractUsernameFromEmail(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.slice(0, atIndex);
    }
    return '';
  }

  toggleStatus(): void {
    this.isLogin = !this.isLogin;
    this.loginForm.reset();
  }

  loginRequest() {
    if (this.loginForm.valid && this.isLogin) {
      this.authService.login(this.loginForm.value).subscribe((suc) => {
        if (suc) {
          Swal.fire('Login Success', 'Welcome Back' + ' ' + this.loginForm.value.username, 'success');
          this.loginForm.reset();
          localStorage.setItem('accessToken', suc.accessToken);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('roles', suc.roles);
          localStorage.setItem('associateId', suc.associateId);
          if(suc.roles=='ROLE_ADMIN'){
            this.router.navigate(['/dashboard/associate']);
          }else{
            this.router.navigate(['/dashboard']);
          }
          
        } else {
          Swal.fire('Oops', "suc.message", 'error');
        }
      },
        (err) => {
          if (err.status == 401) {
            Swal.fire('Oops', "Invalid username/Password", 'error');
          } else {
            Swal.fire('Oops', 'Something went wrong', 'error');
          }
        }
      );
    }
  }
  signupRequest() {
    if (this.signupForm.valid && !this.isLogin) {
      this.authService.addUser(this.signupForm.value).subscribe((suc) => {
        Swal.fire('User added successfully', 'success');
        this.toggleStatus();
      },
        (err) => {
          Swal.fire('Oops', err.error, 'error');
        }
      );
    }
  }
}
