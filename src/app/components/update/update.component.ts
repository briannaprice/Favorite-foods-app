import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  favId: string;
  favFood: string;
  favForm: FormGroup;

  constructor(private actr: ActivatedRoute,
    private firebaseService: FirebaseService,
    public router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.favId= this.actr.snapshot.params.id;
      this.favFood= this.actr.snapshot.params.food;
      this.firebaseService.updateFavorite(this.favId,this.favFood);

      this.favForm = new FormGroup({
        favToAdd: new FormControl(this.favFood)
      });
    }

    updateFavorite(form: FormGroup) {
      let Food = form.value.favToAdd;
      this.firebaseService.updateFavorite(this.favId, Food);
      this.router.navigate(['/favorites']);
    }

}
