import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PolicyScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>PolicyScreen</Text>
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
