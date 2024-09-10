import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-my-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-my-list.component.html',
  styleUrls: ['./pokemon-my-list.component.css']
})
export class PokemonMyListComponent implements OnInit {
  shinyPokemon: any[] = [];
  pokemonDetails: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadShinyPokemonDetails();
  }

  loadShinyPokemonDetails(): void {
    this.pokemonService.getShinyPokemonDetails().subscribe(data => {
      this.pokemonDetails = data.sort((a, b) => a.id - b.id); 
      this.shinyPokemon = this.pokemonDetails.map(pokemon => ({
        id: pokemon.localId,
        name: pokemon.name
      }));
    });
  }

  deletePokemon(id: number): void {
    this.pokemonService.deletePokemon(id).subscribe(() => {
      this.pokemonDetails = this.pokemonDetails.filter(pokemon => pokemon.localId !== id);
      this.shinyPokemon = this.shinyPokemon.filter(pokemon => pokemon.id !== id);
    });
  }
}
