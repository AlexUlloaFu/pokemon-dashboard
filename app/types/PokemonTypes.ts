export interface PokemonData {
  name: string;
  spriteURL: string;
  height: string;
  weight: string;
  moves: Array<string>;
  types: Array<string>;
}

export interface PokemonAPIData {
  name: string;
  url: string;
}
