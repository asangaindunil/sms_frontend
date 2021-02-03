import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule, AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginform: FormGroup;
  err = false;
  errMsg = '';
  wait = false;
  constructor(private fb: FormBuilder,
    private api: ApiService,
    private router: Router) {

    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const val = this.loginform.value;
    this.err = false;
    this.errMsg = "";
    if (val.email && val.password) {
      this.wait = true;
      this.api.login(JSON.stringify(val))
        .subscribe(
          (data: any) => {
            console.log(data);
            this.wait = false;
            this.api.setSession(data);
            console.log("User is logged in");
            this.router.navigate(['/students-list']);
          },
          (err: any) => {
            this.wait = false;
            this.err = true;
            this.errMsg = "Invalid email OR Password";
          }
        );
    } else {
      this.err = true;
      this.errMsg = "Correct email & Password Required";
    }
  }

  navToReg() {
    
  }
}
