import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbAlertModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  isLoading = true;
  alertMessage: string | null = null;

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemonService.getNationalDex().subscribe(data => {
      this.pokemonList = data;
      this.isLoading = false;
    });
  }

  addShiny(pokemon: any): void {
    this.pokemonService.addShinyPokemon(pokemon.name, pokemon.id).subscribe(() => {
      pokemon.shiny = true;
      this.alertMessage = `${pokemon.name} added to shinies!`; 
      
      setTimeout(() => this.alertMessage = null, 2000);
    });
  }
}
