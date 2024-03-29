import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  showAlert = false;
  alertMsg = 'Please wait! Your account is being created.';
  alertColor = 'blue';
  inSubmission = false;

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login(){
    this.showAlert = true;
    this.alertMsg = 'Signing in...';
    this.alertColor = 'blue';
    this.inSubmission = true;

    try{
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email,
        this.credentials.password
      );
    }
    catch(e){
      console.log(e);
      this.alertMsg = 'An unexpected error occurred. Please try again later.';
      this.alertColor = 'red';
      this.inSubmission = false;
      return;
    }

    this.alertMsg = 'Success!';
    this.alertColor = 'green';
  }
}
