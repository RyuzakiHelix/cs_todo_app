import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { CounterComponent } from './components/counter/counter.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { HighlightDirective } from './directives/highlight.directive';
import { HoldableDirective } from './directives/holdable.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from "@auth0/angular-jwt";
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TodoComponent,
    TodoItemComponent,
    AddTodoComponent,
    CounterComponent,
    TodoDetailsComponent,
    HighlightDirective,
    HoldableDirective,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:7221"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '557622739288-8o2o91ieuhec28lssqnt8hecn8of9p7c.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
