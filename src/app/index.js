import { ScrollView, Text } from "react-native";
import Titre from "../components/Titre";
import PokemonCard from "../components/PokemonCard";

const ARTWORK =
"https://raw.githubusercontent.com/PokeAPI/sprites" +
"/master/sprites/pokemon/other/official-artwork/";

const POKEMONS = [
  { number: 1, name: "Bulbizarre", type: "Plante" },
  { number: 4, name: "Salamèche", type: "Feu" },
  { number: 7, name: "Carapuce", type: "Eau" },
  { number: 25, name: "Pikachu", type: "Électrik" },
  { number: 37, name: "Goupix", type: "Feu" },
  { number: 43, name: "Mystherbe", type: "Plante" },
];

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Titre />
      <Text style={styles.pokemonCount}>{POKEMONS.length} Pokémon</Text>
      {POKEMONS.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          number={pokemon.number}
          name={pokemon.name}
          type={pokemon.type}
          image={`${ARTWORK}${pokemon.number}.png`}
        />
      ))}
    </ScrollView>
  );
}

const styles = {
  container: {
    alignItems: "left",
    padding: 20,
    gap: 10,
  },
  pokemonCount: {
    color: "gray",
    fontSize: 15,
  },
};