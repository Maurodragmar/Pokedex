import { Image, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import POKEMONS from "../../data/pokemons";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const selectedNumber = Number(number);
  const pokemon =
    POKEMONS.find((item) => item.number === selectedNumber) ?? POKEMONS[0];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pokemon.name }} />
      <Image source={{ uri: `${ARTWORK}${pokemon.number}.png` }} style={styles.image} />
      <Text style={styles.number}>#{pokemon.number}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.type}>{pokemon.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 24,
    backgroundColor: "#F8F5F0",
  },
  image: {
    width: 280,
    height: 280,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  name: {
    fontSize: 30,
    fontWeight: "700",
  },
  type: {
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 18,
  },
});
