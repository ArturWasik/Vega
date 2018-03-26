import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  profile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'dPSbfQ454nyOZsbBSI3GkUgWVECCH3nt',
    domain: 'itsolutionsproject.eu.auth0.com',
    responseType: 'token id_token',
    audience: 'https://itsolutionsproject.eu.auth0.com/userinfo',
    redirectUri: 'http://localhost:63370/callback',
    scope: 'openid email profile'
  });

  constructor(public router: Router) {
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}');
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';

        this.getProfile(authResult.accessToken);

        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');

    this.profile = null;

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  public getProfile(accessToken: any): void {
    //const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        profile = profile;
        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
      }

    });
  }
}