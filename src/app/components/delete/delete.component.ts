import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  favId: string;

  constructor(private actr: ActivatedRoute,
    private firebaseService: FirebaseService,
    public router: Router) { }

  ngOnInit(): void {
    this.favId= this.actr.snapshot.params.id;
    this.firebaseService.deleteFavorite(this.favId);
    this.router.navigate(['/favorites']);
  }

}
