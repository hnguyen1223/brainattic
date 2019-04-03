import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private afAuth: AngularFireAuth) {}

  public getAuth(): firebase.auth.Auth {
    return this.afAuth.auth;
  }

  public getUser(): Observable<firebase.User> {
    return this.afAuth.user;
  }

  login(choice: number) {
    switch (choice) {
      case 0:
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
      case 1:
        this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
        break;
    }
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
