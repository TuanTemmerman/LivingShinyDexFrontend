import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, tap, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private postUrl = 'http://localhost:3000/add-shiny';
  private shinyListUrl = 'http://localhost:3000/my-shiny-list';
  private deleteUrl = 'http://localhost:3000/delete-shiny';

  constructor(private http: HttpClient) { }

  getNationalDex(): Observable<any[]> {

    return this.http.get<any[]>('http://localhost:3000/nationaldex').pipe(

      switchMap(nationalDex => {
        const requests = nationalDex.map(pokemon =>
          this.http.get(`${this.apiUrl}/${pokemon.id}`).pipe(
            map((pokeApiData: any) => ({
              ...pokemon, 
              image: pokeApiData.sprites.other.home.front_shiny 
            }))
          )
        );
        return forkJoin(requests); 
      }),
      tap(pokemonData => localStorage.setItem('nationalDexWithImages', JSON.stringify(pokemonData)))
    );
  }
  

  addShinyPokemon(name: string, dexnumber: number): Observable<any> {
    return this.http.post<any>(this.postUrl, { name, dexnumber }).pipe(
      tap(() => this.refreshShinyPokemonCache().subscribe())
    );
  }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  deletePokemon(id: number): Observable<any> {
    return this.http.delete(`${this.deleteUrl}/${id}`).pipe(
      tap(() => this.refreshShinyPokemonCache().subscribe())
    );
  }

  refreshShinyPokemonCache(): Observable<any[]> {
    return this.http.get<any[]>(this.shinyListUrl).pipe(
      tap(data => localStorage.setItem('shinyPokemonCache', JSON.stringify(data)))
    );
  }

  getShinyPokemonList(): Observable<any[]> {
    const cachedData = localStorage.getItem('shinyPokemonCache');
    if (cachedData) {
      return of(JSON.parse(cachedData));
    }
    return this.refreshShinyPokemonCache();
  }

  getShinyPokemonDetails(): Observable<any[]> {
    return this.getShinyPokemonList().pipe(
      switchMap(shinyPokemon => {
        const pokemonRequests = shinyPokemon.map(pokemon => this.getPokemon(pokemon.name));
        return forkJoin(pokemonRequests).pipe(
          map(responses => responses.map((data, index) => ({
            localId: shinyPokemon[index].id,
            ...data
          })))
        );
      })
    );
  }
}
