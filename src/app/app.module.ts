import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home//home.component';

import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    TasksComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomeInterceptor,
      multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
