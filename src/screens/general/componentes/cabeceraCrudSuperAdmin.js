import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'


function cabeceraCrudSadmin (props) {

    return (
        <View>
            <ImageBackground source={require('../../../assets/img/fondoCrearUsuario.png')} style={styles.container1} >
                <View >
                    <Icon name='user-circle-o' type='font-awesome' size={50} color='white' containerStyle={{ borderRadius: 30, borderColor: '#000', borderWidth: 3 }} />
                </View>
                <View>
                    <Text style={styles.texto1}>{props.titulo}</Text>
                </View>
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container1: {
        alignItems: 'center',
        justifyContent: "center",
        height: 160
    },
    texto1: {
        color: 'white',
        fontSize: 20

    }

})
export default cabeceraCrudSadmin