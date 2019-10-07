import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import { Fab, Icon, Button } from 'native-base';


function textoHome () {
  
    return (
        <View>
            <Text style={styles.text1}>
                Curso de CX Research UX Testing
                    </Text>
            <Button light small onPress={() => { alert('hola') }} >
                <Text style={styles.text2} >Carrera UX</Text>
            </Button>
            <Text style={styles.text3} >
                Crea productos y experiencias memorables usando tecnicas de investigacion de usuarios.
                Domina pruebas de usabilidad
                para diseñar interfaces intuitivas
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
   
    text1: {
        color: '#fff',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10
    },
    text2: {
        marginLeft: 10,
        marginRight: 10
    },
    text3: {
        color: '#fff',
        fontWeight: '100',
        fontSize: 12,
        marginBottom: 10,
        marginTop: 10
    }
})
export default textoHome