export type PokemonType = {
  abilities: Array<string>;
  color: string;
  description: string;
  evolutions: Array<{ id: string; name: string }>;
  generationName: string;
  height: string;
  id: string;
  name: string;
  stats: Array<{ label: string; value: string }>;
  types: Array<string>;
  weight: string;
};

export type OptionType = {
  label: string;
  value: string;
};
