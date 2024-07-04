import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//自訂的 pipe
import { SharedModule } from './shared-module/shared-module.module';

//CORS
import { BasicAuthHtppInterceptorService } from './services/basic-auth-htpp-interceptor.service';

//相簿用
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//改路由機制 #
// import { HashLocationStrategy, LocationStrategy } from "@angular/common";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    SharedModule,
  ],
  providers: [
    //解決CORS
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true
    } */
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
