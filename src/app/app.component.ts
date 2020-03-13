import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CodeAcademyFavoriteFoods';

  constructor(private firebaseService: FirebaseService,
    public afAuth: AngularFireAuth,
    public router: Router) {}

  ngOnInit() {

    let storageEmail = window.localStorage.getItem('emailaddress');
    if (storageEmail === null) {
      this.AuthLogin(new auth.GoogleAuthProvider());
    } else {
      this.router.navigate(['/favorites']);
    }
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
        window.localStorage.setItem('emailaddress', result.user.email);
        this.router.navigate(['/favorites']);
    }).catch((error) => {
        console.log(error)
    })
  }
}
