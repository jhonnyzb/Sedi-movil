import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function textoCurso() {
    return (

        <View>
            <Text style={styles.texto}>Buscar Cursos</Text>
            <Text style={styles.texto1}>Busca el curso que mas ha estado esperandote</Text>
        </View>);
}

const styles = StyleSheet.create({
    texto: {
       fontWeight: 'bold',
       fontSize: 20,
       fontFamily: 'Roboto'
    },
    texto1:{
        fontFamily: 'Roboto',
        color: '#CFCFCF'

    }
})
export default textoCurso