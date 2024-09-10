import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonMyListComponent } from './pokemon-my-list.component';

describe('PokemonMyListComponent', () => {
  let component: PokemonMyListComponent;
  let fixture: ComponentFixture<PokemonMyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonMyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonMyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
