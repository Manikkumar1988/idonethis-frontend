import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthenticationServiceService } from '../authentication-service.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';


describe('LoginComponent -> Success', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  
  const userService = jasmine.createSpyObj('AuthenticationServiceService', [
    'login'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthenticationServiceService, useValue: userService }
      ],
      imports: [ReactiveFormsModule,
                RouterTestingModule.withRoutes([])]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.get(Router);
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

  it('password field validity', () => {
    const password = component.loginForm.controls.password;
    expect(password.valid).toBeFalsy();
  });

  it('password field invalidity', () => {
    let errors = {};
    const password = component.loginForm.controls.password;
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('username field validity upon value', () => {
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

  it('should go to home page on successfull login',() =>{
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.loginForm.controls.username.setValue('username');
    component.loginForm.controls.password.setValue('password');
    expect(component.loginForm.valid).toBeTruthy();

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });



it('should go to register page on clicking register link',() =>{
  const  debugEl = fixture.debugElement;
  const linkDebugEl = debugEl.query(By.css('a')); 
  const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
  expect(routerLinkInstance['commands']).toEqual(['/register']); 
  expect(routerLinkInstance['href']).toEqual('/register');

})
});


describe('LoginComponent -> Error', () => {
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
      imports: [ReactiveFormsModule,
        RouterTestingModule.withRoutes([])]
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

  it('Invalid username and password should not make a api call', () => {
    expect(component.loginForm.valid).toBeFalsy();
    component.loginForm.controls.username.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();

    component.onSubmit();

    expect(userService.login).not.toHaveBeenCalled();
  });
});
