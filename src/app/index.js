import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PokemonCard from "../components/PokemonCard";
import Titre from "../components/Titre";
import POKEMONS from "../data/pokemons";

export default function Index() {
  const [capturedNumbers, setCapturedNumbers] = useState(() => new Set());
  const [showCaptures, setShowCaptures] = useState(false);
  const displayed = showCaptures
    ? POKEMONS.filter((pokemon) => capturedNumbers.has(pokemon.number))
    : POKEMONS;

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
          name={item.name}
          type={item.type}
          captured={capturedNumbers.has(item.number)}
          onToggleCaptured={toggleCaptured}
        />
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