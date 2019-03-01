import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.class';
import { Router } from '@angular/router';
import { HashService } from '../shared/hash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User;

  emailMessage: string;
  passwordMessage: string;
  firstNameMessage: string;
  lastNameMessage: string;
  telephoneMessage: string;

  validationMessages = {
    required: 'This input is required',
    minlength: 'Password should be at least 6 chars.',
    email: 'Enter valid email'
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
     private hashService: HashService) { }

  ngOnInit() {
    this.initializeRegisterForm();
    this.checkValidationMesssages();    
  }

  checkValidationMesssages() {
    const firstName = this.registerForm.get('firstName');
    firstName.valueChanges.subscribe(value => {
      this.firstNameMessage = this.setMessage(firstName)[0];
    })
    const lastName = this.registerForm.get('lastName');
    lastName.valueChanges.subscribe(value => {
      this.lastNameMessage = this.setMessage(lastName)[0];
    })
    const email = this.registerForm.get('email');
    email.valueChanges.subscribe(value => {
      this.emailMessage = this.setMessage(email)[0];
    })
    const password = this.registerForm.get('password');
    password.valueChanges.subscribe(value => {
      this.passwordMessage = this.setMessage(password)[0];
    })
    const telephone = this.registerForm.get('telephone');
    telephone.valueChanges.subscribe(value => {
      this.telephoneMessage = this.setMessage(telephone)[0];
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

  createNewAccount(){
    this.userService.addUser(this.getRegisterFormValue())
    .then(data => {
      this.router.navigate(['/login']);
    })
    .catch(err => alert("There was an error, please try again."));
  }

  getRegisterFormValue() {
    return Object.assign(this.registerForm.value, {password: this.hashService.hashTheString(this.registerForm.get('password').value)});
  }

  initializeRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profilePicture: 'http://shackmanlab.org/wp-content/uploads/2013/07/person-placeholder.jpg'
    });
  }

}
