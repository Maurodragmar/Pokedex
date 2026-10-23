import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function CompteurPokeballs() {
  const [nombre, setNombre] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.count}>Pokéballs : {nombre}</Text>
      <View style={styles.buttons}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setNombre((current) => current + 1)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+1</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: nombre === 0 }}
          disabled={nombre === 0}
          onPress={() => setNombre((current) => Math.max(0, current - 1))}
          style={[styles.button, nombre === 0 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>-1</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => setNombre(0)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Réinitialiser</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = {
  container: {
    gap: 8,
  },
  count: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ECE8DE",
    borderRadius: 20,
    justifyContent: "center",
    minHeight: 40,
    paddingHorizontal: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
  },
};
