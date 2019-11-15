import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../authentication-service.service';
import { RegisterComponent } from './register.component';
import { Observable } from 'rxjs';
import { Status } from '../_models/status';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

describe('RegisterComponent ->Success', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router: Router;

  const userService = jasmine.createSpyObj('AuthenticationServiceService', [
    'register'
  ]);
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent,
      LoginComponent ],
      providers: [
        { provide: AuthenticationServiceService, useValue: userService }
      ],
      imports: [ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                  { path: 'login', component: LoginComponent }
                ])]
              });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    router = TestBed.get(Router);
    userService.register.and.returnValue(
      new Observable(subscriber => subscriber.next(new Status()))
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    const username = component.registerForm.controls.username;
    expect(username.valid).toBeFalsy();
  });

  it('username field invalidity', () => {
    let errors = {};
    const username = component.registerForm.controls.username;
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('password field validity', () => {
    const password = component.registerForm.controls.password;
    expect(password.valid).toBeFalsy();
  });
  
  it('password field invalidity', () => {
    let errors = {};
    const password = component.registerForm.controls.password;
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('firstname field validity', () => {
    const firstName = component.registerForm.controls.firstName;
    expect(firstName.valid).toBeFalsy();
  });
  
  it('firstname field invalidity', () => {
    let errors = {};
    const firstName = component.registerForm.controls.firstName;
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('valid firstname, username and password should make a api call', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls.firstName.setValue('firstName');
    component.registerForm.controls.username.setValue('username');
    component.registerForm.controls.password.setValue('password');
    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();

    expect(userService.register).toHaveBeenCalled();
    expect(userService.register).toHaveBeenCalledWith('firstName', 'username', 'password');
  });

  it('should go to login page on clicking cancel button',() =>{
    const  debugEl = fixture.debugElement;
    const linkDebugEl = debugEl.query(By.css('a')); 
    const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance['commands']).toEqual(['/login']); 
    expect(routerLinkInstance['href']).toEqual('/login');
  
  });

  //on successful registration it should go to login page
  it('should go to login page on successfull registration',() =>{
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');

    component.registerForm.controls.firstName.setValue('firstName');
    component.registerForm.controls.username.setValue('username');
    component.registerForm.controls.password.setValue('password');
    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});

describe('RegisterComponent ->failure', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const userService = jasmine.createSpyObj('AuthenticationServiceService', [
    'register'
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: AuthenticationServiceService, useValue: userService }
      ],
      imports: [ReactiveFormsModule,
                RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    userService.register.and.returnValue(
      new Observable(subscriber => subscriber.next(new Status()))
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Invalid firstname, username and password should make a api call', () => {
    expect(component.registerForm.valid).toBeFalsy();
    component.registerForm.controls.firstName.setValue('');
    component.registerForm.controls.username.setValue('');
    component.registerForm.controls.password.setValue('');
    expect(component.registerForm.invalid).toBeTruthy();

    component.onSubmit();
    expect(userService.register).not.toHaveBeenCalled();
  });
});