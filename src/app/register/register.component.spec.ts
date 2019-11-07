import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationServiceService } from '../authentication-service.service';
import { RegisterComponent } from './register.component';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Status } from '../_models/status';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkWithHref } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RegisterComponent ->Success', () => {
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
  it('should go to login page on clicking cancel button',() =>{
    const  debugEl = fixture.debugElement;
    const linkDebugEl = debugEl.query(By.css('a')); 
    const routerLinkInstance = linkDebugEl.injector.get(RouterLinkWithHref);
    expect(routerLinkInstance['commands']).toEqual(['/login']); 
    expect(routerLinkInstance['href']).toEqual('/login');
  
  })
});
