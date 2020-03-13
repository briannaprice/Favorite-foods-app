import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/interfaces/favorite';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite[] = [];
  favForm: FormGroup;

  constructor(private firebaseService: FirebaseService,
    private formBuilder: FormBuilder) {
    let storageEmail = window.localStorage.getItem('emailaddress');

    this.firebaseService.getFavorites().subscribe(data => {
      this.favorites = [];
      data.map(e => {
        if (storageEmail === e['EmailAddress']) {
          let favToPush: Favorite = {id: e['id'], EmailAddress: e['EmailAddress'], Food: e['Food']}
          this.favorites.push(favToPush);
        }
      })
    });

    this.favForm = new FormGroup({
      favToAdd: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  addFavorite(form: FormGroup) {
    let EmailAddress = localStorage.getItem('emailaddress');
    let favParm = { EmailAddress: EmailAddress, Food: form.value.favToAdd }
    this.firebaseService.addFavorite(favParm);
    this.favorites = [];
    this.firebaseService.getFavorites();
  }

  deleteFav(idToDelete: string) {
    this.firebaseService.deleteFavorite(idToDelete);
  }

}
