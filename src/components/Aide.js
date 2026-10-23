import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Aide() {
  const [aideVisible, setAideVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: aideVisible }}
        onPress={() => setAideVisible((visible) => !visible)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {aideVisible ? "Masquer aide" : "Afficher aide"}
        </Text>
      </Pressable>
      {aideVisible && (
        <Text style={styles.message}>
          Chaque carte présente le numéro, le nom et le type d’un Pokémon.
        </Text>
      )}
    </View>
  );
}

const styles = {
  container: {
    gap: 8,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#ECE8DE",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  buttonText: {
    fontWeight: "bold",
  },
  message: {
    color: "gray",
  },
};
