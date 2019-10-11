import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display username textfield', () => {
    const userNameTextBox = fixture.debugElement.query(By.css('#userName')).nativeElement;
    expect(userNameTextBox).toBeTruthy();
    expect(userNameTextBox.placeholder).toEqual("Email");
  });


  it('should display password textfield', () => {
    const passwordTextBox = fixture.debugElement.query(By.css('#password')).nativeElement;
    expect(passwordTextBox).toBeTruthy();
    expect(passwordTextBox.placeholder).toEqual("password");
    expect(passwordTextBox.type).toEqual("password");
  });

  it('should display login button', () => {
    const loginButton = fixture.debugElement.query(By.css('#loginButton')).nativeElement;
    expect(loginButton).toBeTruthy();
    expect(loginButton.type).toEqual("button");
    expect(loginButton.value).toEqual("Login");

  });
});
