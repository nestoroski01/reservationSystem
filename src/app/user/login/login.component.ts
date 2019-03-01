import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.class';
import { Router } from '@angular/router';
import { GlobalService } from '../../core/global.service';
import { AngularFireAction } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HashService } from '../shared/hash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  emailMessage: string;
  passwordMessage: string;

  validationMessages = {
    required: 'This input is required',
    minlength: 'Password should be at least 6 chars.',
    email: 'Enter valid email'
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
    private global: GlobalService, private angularFireAuth: AngularFireAuth, private hashService: HashService) { }

  ngOnInit() {
    this.initializeLoginForm();
    this.checkValidationMesssages();
  }

  checkValidationMesssages() {
    const email = this.loginForm.get('email');
    email.valueChanges.subscribe(value => {
      this.emailMessage = this.setMessage(email)[0];
    })
    const password = this.loginForm.get('password');
    password.valueChanges.subscribe(value => {
      this.passwordMessage = this.setMessage(password)[0];
    })
  }
  
  setMessage(c: AbstractControl): Array<string> {
    let messages = [];
    if ((c.dirty || c.touched) && c.errors) {
      Object.keys(c.errors).map(key => {
        if (this.validationMessages[key])
          messages.push(this.validationMessages[key]);
      });
    }
    return messages;
  }

  login() {
    this.userService.loginAuth(this.getLoginFormValue()).subscribe(data => {
      if (data.length > 0) {
        console.log(data);
        this.global.setUser(data[0]);
        this.global.setIsLogged(true);
        this.router.navigate(['/events']);
      }
    });
  }

  loginWithFb() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.angularFireAuth.auth
      .signInWithPopup(provider)
      .then((res: any) => {
        let user: User = {
          key: res.additionalUserInfo.profile.id,
          data: {
            email: res.additionalUserInfo.profile.email,
            firstName: res.additionalUserInfo.profile.first_name,
            lastName: res.additionalUserInfo.profile.last_name,
            profilePicture: `http://graph.facebook.com/${res.additionalUserInfo.profile.id}/picture?type=large`
          }
        }
        this.global.setUser(user);
        this.global.setIsLogged(true);
        this.router.navigate(['/events']);
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
  }

  getLoginFormValue() {
    return Object.assign(this.loginForm.value, {password: this.hashService.hashTheString(this.loginForm.get('password').value)});
    
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}
