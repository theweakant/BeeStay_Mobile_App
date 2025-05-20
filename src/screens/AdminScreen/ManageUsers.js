import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ManageUsers() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Users</Text>
            {/* Add your user management UI here */}
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
