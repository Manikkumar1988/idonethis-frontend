import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { appRoutingModule } from '../app.routing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        appRoutingModule
      ]
    })
    .compileComponents().then(() =>{
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      fixture.detectChanges();
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LoginComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it(`should have as text 'login page'`, async(() => {
    expect(component.text).toEqual('login page');
  }));

  it('form should be invalid', async(() => {
    component.loginForm.controls['username'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  }));

  // it('should display username textfield', () => {
  //   const userNameTextBox = fixture.debugElement.query(By.css('#userName')).nativeElement;
  //   expect(userNameTextBox).toBeTruthy();
  //   expect(userNameTextBox.placeholder).toEqual("Email");
  // });


  // it('should display password textfield', () => {
  //   const passwordTextBox = fixture.debugElement.query(By.css('#password')).nativeElement;
  //   expect(passwordTextBox).toBeTruthy();
  //   expect(passwordTextBox.placeholder).toEqual("password");
  //   expect(passwordTextBox.type).toEqual("password");
  // });

  // it('should display login button', () => {
  //   const loginButton = fixture.debugElement.query(By.css('#loginButton')).nativeElement;
  //   expect(loginButton).toBeTruthy();
  //   expect(loginButton.type).toEqual("button");
  //   expect(loginButton.value).toEqual("Login");

  // });
});
