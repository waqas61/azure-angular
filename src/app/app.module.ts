import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';




import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MsalModule} from "@azure/msal-angular";
import { MsalInterceptor} from "@azure/msal-angular";

import { HttpServiceHelper } from './common/HttpServiceHelper';
import { UserComponent } from './user/user.component';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}


export const protectedResourceMap:[string, string[]][]=[ ['https://buildtodoservice.azurewebsites.net/api/todolist',['api://235a7cd0-8e5c-4955-9df0-5389f1e41d51/access_as_user']] , ['https://graph.microsoft.com/v1.0/me', ['user.read']] ];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot({
        clientID: '******', // update it
        authority: "******", // update it
        validateAuthority: true,
        redirectUri: "http://localhost:4200/",
        cacheLocation : "localStorage",
        storeAuthStateInCookie: isIE, // set to true for IE 11
        postLogoutRedirectUri: "http://localhost:4200/",
        navigateToLoginRequestUrl: true,
        popUp: !isIE,
        consentScopes: [ "user.read", "openid", "profile", "api://**********/access_as_user"],// update it
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        protectedResourceMap: protectedResourceMap,
        logger: loggerCallback,
        correlationId: '1234',
        piiLoggingEnabled: true
      }
    ),
  ],
  providers: [ HttpServiceHelper,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}