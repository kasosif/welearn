import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              // private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.LoginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,}$')]]
      }
    );
  }
  onSubmit() {
    this.errorMessage = null;
    const username = this.LoginForm.get('username').value;
    const password = this.LoginForm.get('password').value;
    // this.authService.signinUser(username, password).subscribe(
    //   (response: Userinfo) => {
    //     localStorage.setItem('userinfo', JSON.stringify(response));
    //     localStorage.setItem('loggedin', 'true');
    //     this.router.navigate(['/myboards']);
    //   },
    //   () => {
    //     this.errorMessage = 'Wrong Username or Password';
    //   }
    // );
  }

}
