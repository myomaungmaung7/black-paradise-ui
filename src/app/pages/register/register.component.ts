import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminControllerService, DateGirlControllerService, HornyGuyControllerService } from '../../services/services';
import { UserDto } from '../../services/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  signUpForm: FormGroup;
  registerRequest: UserDto = {
    name: '',
    email: '',
    phoneNum: '',
    password: '',
    createdAt: new Date().toISOString().split('T')[0],
    userTypes: undefined,
    amount: undefined,
    adminCode: '',
  };
  
  adminCodeVisible = false;
  amountVisible = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminControllerService,
    private dateGirlService: DateGirlControllerService,
    private hornyGuyService: HornyGuyControllerService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNum: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      createAt: [new Date().toISOString().split('T')[0], Validators.required],
      userType: ['', Validators.required],
      adminCode: ['', Validators.required],
      amount: ['', Validators.required],
      terms: ['', Validators.required]
    });
  }
  get f() {
    return this.signUpForm.controls;
  }

  hide: boolean = true;

  onUserTypeChange() {
    const selectedType = this.signUpForm.value.userType;

    if(selectedType === 'DATE_GIRL') {
      this.adminCodeVisible = true;
      this.amountVisible = true;
    } else {
      this.adminCodeVisible = false;
      this.amountVisible = false;
    }
  }

  onSignUp() {
    this.submitted = true;

    if(this.signUpForm.valid) {
      console.log('Form is invalid')
      return;
    }

    this.registerRequest = {
      name: this.signUpForm.value.name,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      phoneNum: this.signUpForm.value.phoneNum,
      userTypes: this.signUpForm.value.userType,
      createdAt: new Date().toISOString(),
      amount:this.amountVisible ? this.signUpForm.value.amount : undefined,
      adminCode: this.adminCodeVisible ? this.signUpForm.value.adminCode : undefined,
    };

    switch (this.registerRequest.userTypes) {
      case 'HORNY_GUY':
        this.hornyGuyService.register({body: this.registerRequest}).subscribe(response => {
          console.log('Horny Guy Registered', response);
          this.router.navigate(['']);
        });
        break;
      case 'DATE_GIRL':
        this.dateGirlService.register1({body: this.registerRequest}).subscribe(response => {
          console.log('Date Girl Registered', response);
          this.router.navigate(['']);
        });
        break;
      case 'ADMIN':
        this.adminService.register3({body: this.registerRequest}).subscribe(response => {
          console.log('Admin Registered', response);
          this.router.navigate(['']);
        });
        break; 
      default:
        console.error('Invalid user type');
    }
  }

  onSignIn() {
    this.router.navigate(['']);
  }
}
