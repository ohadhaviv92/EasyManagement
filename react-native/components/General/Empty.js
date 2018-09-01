import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


export default () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ריק</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E74C3C',
    },
    text: {
        fontSize: 21,
        color: '#ECF0F1',
    }

})


