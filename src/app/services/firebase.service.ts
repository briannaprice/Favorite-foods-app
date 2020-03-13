import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Favorite } from '../interfaces/favorite';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  favDoc: AngularFirestoreDocument<Favorite>;

  constructor(private firestore: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router) {}

  getFavorites() {
    return this.firestore.collection('Foods').valueChanges({ idField: 'id' });
  }

  addFavorite(data) {
    new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("Foods")
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  deleteFavorite(deleteId) {
    this.firestore.collection("Foods").doc(deleteId).delete().then(function() {
      //console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  }
    
  updateFavorite(updateId, updateFood) {
    var favRef = this.firestore.collection("Foods").doc(updateId);

    return favRef.update({
      Food: updateFood
    })
    .then(function() {
      //console.log("Document successfully updated!");
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      //console.error("Error updating document: ", error);
    });
  }

  signout() {
    return this.afAuth.auth.signOut().then(() => {
      //window.localStorage.removeItem('emailaddress');
      //this.router.navigate(['favorites']);
    }, function(error) {
      console.log('error logging out')
    })
  }
}



