import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent implements OnInit {

  pokemon: any;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(): void {
    this.pokemonService.getPokemon('pikachu').subscribe(data => {
      this.pokemon = data;
    });
  }
}
