import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private postUrl = 'http://localhost:3000/add-shiny';
  private shinyListUrl = 'http://localhost:3000/my-shiny-list';
  private deleteUrl = 'http://localhost:3000/delete-shiny';

  constructor(private http: HttpClient) { }

  getAllPokemonImages(): Observable<any[]> {
    const cachedData = localStorage.getItem('pokemonData');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
  
    const requests = [];
    for (let i = 1; i <= 1025; i++) {
      requests.push(this.http.get(`${this.apiUrl}/${i}`));
    }
  
    return forkJoin(requests).pipe(
      map((responses: any[]) =>
        responses.map((pokemon: any) => ({
          name: pokemon.name,
          image: pokemon.sprites.other.home.front_shiny,
          id: pokemon.id
        }))
      ),
      tap((pokemonData) => {
        localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
      })
    );
  }
  
  addShinyPokemon(name: string, dexnumber: number): Observable<any> {
    return this.http.post<any>(this.postUrl, { name, dexnumber });
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`)
  }

  deletePokemon(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`);
  }

  refreshShinyPokemonCache(): Observable<any[]> {
    return this.http.get<any[]>(this.shinyListUrl).pipe(
      tap(data => {
        localStorage.setItem('shinyPokemonCache', JSON.stringify(data));
      })
    );
  }
}
