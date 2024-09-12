import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './Components/pokemon/pokemon.component';
import { NgModule } from '@angular/core';
import { PokemonListComponent } from './Components/pokemon-list/pokemon-list.component';
import { PokemonMyListComponent } from './Components/pokemon-my-list/pokemon-my-list.component';
import { HomeComponent } from './Components/home/home.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'pokemonlist', component: PokemonListComponent },
    { path: 'mylist', component: PokemonMyListComponent },
    { path: '', component: HomeComponent}
];