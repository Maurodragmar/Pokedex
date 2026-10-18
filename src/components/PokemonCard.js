import { Image, Text, View } from "react-native";

export default function PokemonCard({ number, name, type, image }) {
    return (
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.image} />
            <View>
                <Text style={styles.number}>#{number}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{type}</Text>
            </View>
        </View>
    );
}

export const styles = {
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20,
        gap: 10,
    },

    image: {
        width: 80,
        height: 80,
        marginRight: 10
    },

    number: {
        color: "gray",
    },

    name: {
        fontSize: 20,
        fontWeight: "bold",
    },

    type: {
        color: "gray",
        backgroundColor: "#ECE8DE",
        borderRadius: 20,
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontWeight: "bold",
        marginTop: 10,
    },
}