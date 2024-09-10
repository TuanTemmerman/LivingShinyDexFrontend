import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  isLoading = true;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemonService.getAllPokemonImages().subscribe(data => {
      this.pokemonList = data;
      this.isLoading = false;
    });
  }

  addShiny(pokemon: any): void {
    this.pokemonService.addShinyPokemon(pokemon.name, pokemon.id).subscribe(response => {
      alert(`${pokemon.name} added to shinyowned!`);
      
      // Update the cache in PokemonMyListComponent after adding new shiny
      this.pokemonService.refreshShinyPokemonCache().subscribe();
    });
  }
}
