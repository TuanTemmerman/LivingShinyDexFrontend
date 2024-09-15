import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../Services/pokemon.service';
import { CommonModule } from '@angular/common';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  totalShinyPercentage: number = 0;
  shinyPercentageByGen: any[] = [];
  recentShinyPokemon: any[] = [];

  genRegionMap: { [key: string]: string } = {
    '1': 'Kanto',
    '2': 'Johto',
    '3': 'Hoenn',
    '4': 'Sinnoh',
    '5': 'Unova',
    '6': 'Kalos',
    '7': 'Alola',
    '8': 'Galar',
    '9': 'Paldea'
  };  

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadTotalShinyPercentage();
    this.loadShinyPercentageByGen();
    this.loadRecentShinyPokemon();
  }

  loadTotalShinyPercentage(): void {
    this.pokemonService.getTotalShinyPercentage().subscribe(total => {
      this.totalShinyPercentage = total;
    });
  }

  loadShinyPercentageByGen(): void {
    this.pokemonService.getShinyPercentageByGen().subscribe(data => {
      this.shinyPercentageByGen = data;
    });
  }

  getRegionName(gen: string): string {
    return this.genRegionMap[gen] || 'Unknown';
  }

  loadRecentShinyPokemon(): void {
    this.pokemonService.getRecentShinyPokemon().subscribe(data => {
      this.recentShinyPokemon = data;
    });
  }

  getRegionColor(gen: string): string {
    const regionColorMap: { [key: string]: string } = {
      '1': '#ff0000', // Kanto
      '2': '#ff8800', // Johto
      '3': '#00cc44', // Hoenn
      '4': '#0099ff', // Sinnoh
      '5': '#ff33cc', // Unova
      '6': '#cc00cc', // Kalos
      '7': '#66ccff', // Alola
      '8': '#9933ff', // Galar
      '9': '#ffcc00', // Paldea
    };
    return regionColorMap[gen] || '#ff0000';
  }  
}
