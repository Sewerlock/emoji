import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewServiceService } from './new-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from 'selenium-webdriver/http';
import { FavoritesComponent } from './favorites/favorites.component';
import { DeletesComponent } from './deletes/deletes.component';
import { CookieService } from 'ngx-cookie-service';

const appRoutes: Routes = [
	{path: '', component: HomeComponent},
	{path: 'favorites', component: FavoritesComponent},
	{path: 'deletes', component: DeletesComponent},
	// {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
	AppComponent,
	HomeComponent,
    // NotFoundComponent,
    FavoritesComponent,
    DeletesComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	RouterModule.forRoot(appRoutes),
	HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
