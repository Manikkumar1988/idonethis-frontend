import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const userService = jasmine.createSpyObj('AuthenticationServiceService', [
    'login'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationServiceService, useValue: userService }
      ],
      imports: [ReactiveFormsModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    userService.login.and.returnValue(
      new Observable(subscriber => subscriber.next(new User()))
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const username = component.loginForm.controls.username;
    expect(username.valid).toBeFalsy();
  });

  it('username field invalidity', () => {
    let errors = {};
    const username = component.loginForm.controls.username;
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('username field invalidity', () => {
    const username = component.loginForm.controls.username;
    username.setValue('test');
    expect(username.valid).toBeTruthy();
  });

  it('valid username and password should make a api call', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.username.setValue('test@test.com');
    component.loginForm.controls.password.setValue('123456789');
    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();

    expect(userService.login).toHaveBeenCalled();
    expect(userService.login).toHaveBeenCalledWith('test@test.com', '123456789');
  });


  it('Invalid username and password should not make a api call', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.username.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();

    component.onSubmit();

    expect(userService.login).not.toHaveBeenCalled();
  });
});
