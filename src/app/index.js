import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";
import POKEMONS from "../data/pokemons";

export default function Index() {
  const [onlyFire, setOnlyFire] = useState(false);
  const displayed = onlyFire ? POKEMONS.filter((pokemon) => pokemon.type === "Feu") : POKEMONS;

  return (
    <FlatList
      data={displayed}
      keyExtractor={(pokemon) => String(pokemon.number)}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.listContent}
      ListHeaderComponent={
        <View style={styles.header}>
          <Titre texte="Mon Pokédex" />
          <Text>{displayed.length} Pokémon</Text>
          <Pressable
            onPress={() => setOnlyFire(!onlyFire)}
            style={[styles.filterButton, onlyFire && styles.filterButtonActive]}
          >
            <Text style={[styles.filterText, onlyFire && styles.filterTextActive]}>
              {onlyFire ? "Afficher tous les Pokémon" : "Afficher seulement le type Feu"}
            </Text>
          </Pressable>
        </View>
      }
      renderItem={({ item }) => (
        <PokemonCard number={item.number} name={item.name} type={item.type} />
      )}
    />
  );
}

const styles = StyleSheet.create({
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