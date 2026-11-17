import { Image, StyleSheet, Text, View } from "react-native";

export default function Profil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.name}>Raphaël</Text>
      <Text style={styles.label}>Pokémon préféré</Text>
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        }}
        style={styles.image}
      />
      <Text style={styles.favorite}>Pikachu</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "600",
  },
  label: {
    fontSize: 16,
    color: "#555",
  },
  image: {
    width: 180,
    height: 180,
  },
  favorite: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F08030",
  },
});
