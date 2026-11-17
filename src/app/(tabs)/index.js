import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import PokemonCard from "../../components/PokemonCard";
import Titre from "../../components/Titre";

const API = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function Index() {
  const [pokemons, setPokemons] = useState(null);
  const [capturedNumbers, setCapturedNumbers] = useState(() => new Set());
  const [showCaptures, setShowCaptures] = useState(false);

  useEffect(() => {
    async function charger() {
      const response = await fetch(API);
      const data = await response.json();
      const liste = data.results.map((pokemon, index) => ({
        number: index + 1,
        name: pokemon.name,
      }));
      setPokemons(liste);
    }

    charger();
  }, []);

  const displayed = pokemons
    ? showCaptures
      ? pokemons.filter((pokemon) => capturedNumbers.has(pokemon.number))
      : pokemons
    : [];

  function toggleCaptured(number) {
    setCapturedNumbers((current) => {
      const updated = new Set(current);
      if (updated.has(number)) {
        updated.delete(number);
      } else {
        updated.add(number);
      }
      return updated;
    });
  }

  if (!pokemons) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F08030" />
      </View>
    );
  }

  return (
    <FlatList
      data={displayed}
      extraData={capturedNumbers}
      keyExtractor={(pokemon) => String(pokemon.number)}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.header}>
          <Titre texte="Mon Pokédex" />
          <Text>Pokémon capturés : {capturedNumbers.size}</Text>
          <Pressable
            onPress={() => setShowCaptures((current) => !current)}
            style={[styles.filterButton, showCaptures && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, showCaptures && styles.filterTextActive]}>
              {showCaptures ? "Afficher tous les Pokémon" : "Mes captures"}
            </Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <PokemonCard
          number={item.number}
          name={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          type={"Normal"}
          captured={capturedNumbers.has(item.number)}
          onToggleCaptured={toggleCaptured}
          onPress={() =>
            router.push({
              pathname: "/pokemon/[number]",
              params: { number: String(item.number) },
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F5F0",
  },
  listContent: { padding: 16, gap: 12 },
  column: { gap: 12 },
  header: { gap: 12 },
  filterButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ECE8DE",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  filterButtonActive: { backgroundColor: "#F08030" },
  filterText: { fontWeight: "bold", color: "#333333" },
  filterTextActive: { color: "#FFFFFF" },
});
