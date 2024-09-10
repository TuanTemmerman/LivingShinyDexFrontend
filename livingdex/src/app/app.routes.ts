import { RouterModule, Routes } from '@angular/router';
import { PokemonComponent } from './Components/pokemon/pokemon.component';
import { NgModule } from '@angular/core';
import { PokemonListComponent } from './Components/pokemon-list/pokemon-list.component';
import { PokemonMyListComponent } from './Components/pokemon-my-list/pokemon-my-list.component';


export const routes: Routes = [
    { path: 'pokemon', component: PokemonComponent},
    { path: 'pokemonlist', component: PokemonListComponent },
    { path: 'mylist', component: PokemonMyListComponent }
];