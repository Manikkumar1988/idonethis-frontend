import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../authentication-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	loading = false;
	submitted = false;
	constructor(private formBuilder: FormBuilder,
	private authenticationService: AuthenticationServiceService) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			firstName: ['', Validators.required]

		});
	}

	get f() { return this.registerForm.controls; }


	onSubmit() {
		this.submitted = true;
	
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		this.authenticationService.register(this.f.firstName.value,this.f.username.value, this.f.password.value)
			.pipe(first()) // this gets the first element.
			.subscribe(
				data => {// on successfull registeration redirect to login page
					//this.router.navigate([this.returnUrl]);
				},
				error => {
					this.loading = false;
				});
	}

}
