import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CabeceraCrearUsuario from '../componentes/cabeceraCrearusuario'


class crearUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View >
                <CabeceraCrearUsuario/>
                <View style={styles.contenedorCliente}> 
                    <Text style={styles.texto1}>Escoge un cliente</Text>
                    <Text>Cliente</Text>
                </View>
                
            </View>
            
        );
    }
}

export default crearUsuario;

const styles = StyleSheet.create({
    contenedorCliente:{
        padding: 30
    },
    texto1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }
    
})