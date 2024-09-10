import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pokemon-my-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-my-list.component.html',
  styleUrl: './pokemon-my-list.component.css'
})
export class PokemonMyListComponent implements OnInit {

  shinyPokemon: any[] = [];
  pokemonDetails: any[] = [];

  constructor(private http: HttpClient, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getShinyPokemon();
  }

  getShinyPokemon(): void {
    const cachedData = localStorage.getItem('shinyPokemonCache');
    
    if (cachedData) {
      this.shinyPokemon = JSON.parse(cachedData);
      this.fetchPokemonDetails();
    } else {
      this.pokemonService.refreshShinyPokemonCache().subscribe(data => {
        this.shinyPokemon = data;
        this.fetchPokemonDetails();
      });
    }
  }

  fetchPokemonDetails(): void {
    const pokemonRequests = this.shinyPokemon.map(pokemon => 
      this.pokemonService.getPokemon(pokemon.name)
    );

    // Wait for all API requests to complete
    forkJoin(pokemonRequests).subscribe(responses => {
      this.pokemonDetails = responses.map((data, index) => ({
        localId: this.shinyPokemon[index].id,
        ...data
      }));

      // Sort pokemonDetails based on dexnumber or another criteria
      this.pokemonDetails.sort((a, b) => a.id - b.id); // Sorting by Pokedex number (dexnumber)
    });
  }

  deletePokemon(id: number): void {
    this.pokemonService.deletePokemon(id).subscribe(() => {
      this.pokemonDetails = this.pokemonDetails.filter(pokemon => pokemon.localId !== id);
      this.shinyPokemon = this.shinyPokemon.filter(pokemon => pokemon.id !== id);
      
      localStorage.setItem('shinyPokemonCache', JSON.stringify(this.shinyPokemon));
    });
  }
}
