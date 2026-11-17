import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const selectedNumber = Number(number);
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function chargerPokemon() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${selectedNumber}`
      );
      const data = await response.json();

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${selectedNumber}`
      );
      const speciesData = await speciesResponse.json();
      const nomFr = speciesData.names.find((entry) => entry.language.name === "fr")?.name;

      setPokemon({
        number: data.id,
        name: nomFr ?? data.name,
        type: data.types[0]?.type?.name ?? "normal",
        height: data.height / 10,
        weight: data.weight / 10,
        image: data.sprites.other["official-artwork"].front_default,
      });
    }

    chargerPokemon();
  }, [selectedNumber]);

  if (!pokemon) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F08030" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: pokemon.name }} />
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.number}>#{pokemon.number}</Text>
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.type}>{pokemon.type}</Text>
      <View style={styles.meta}>
        <Text style={styles.metaText}>Taille : {pokemon.height} m</Text>
        <Text style={styles.metaText}>Poids : {pokemon.weight} kg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F5F0",
  },
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
  meta: {
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 18,
  },
});
