import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoriteScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>FavoriteScreen</Text>
            {/* Add your dashboard components here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
