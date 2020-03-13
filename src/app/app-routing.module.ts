import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { DeleteComponent } from './components/delete/delete.component';
import { UpdateComponent } from './components/update/update.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'delete/:id', component: DeleteComponent},
  {path: 'update/:id/:food', component: UpdateComponent},
  {path: 'signout', component: SignoutComponent},
  //{path: '**', redirectTo: 'localhost:4200'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
