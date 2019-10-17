import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class inicioUsuario extends Component {


    crudUsuarios = () => {
        this.props.navigation.navigate('crudUsuarios')
    }
    crudClientes = () => {
        this.props.navigation.navigate('crudClientes')
    }
    crudLicencias = () => {
        this.props.navigation.navigate('crudLicencias')
    }
    crudCursos = () => {
        this.props.navigation.navigate('crudCursos')
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.texto1}>Crea un recurso</Text>
                <TouchableOpacity onPress = {this.crudUsuarios} disabled={true} >
                    <View style={styles.bcrearUsuario}>
                        <Text style={styles.textoBcrearUsuario}>Crear Usuario</Text>
                        <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.crudClientes} disabled={true} >
                    <View style={styles.bcrearUsuario}>
                        <Text style={styles.textoBcrearUsuario}>Crear cliente</Text>
                        <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.crudLicencias} disabled={true} >
                    <View style={styles.bcrearUsuario}>
                        <Text style={styles.textoBcrearUsuario}>Crear licencia</Text>
                        <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this.crudCursos} >
                    <View style={styles.bcrearUsuario}>
                        <Text style={styles.textoBcrearUsuario}>Crear curso</Text>
                        <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%',
        paddingTop: '8%'
    },
    texto1: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: '10%'
    },
    bcrearUsuario: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: '#ff5a06',
        padding: 25,
        marginBottom: '10%',
        justifyContent: 'space-between'
    },
    textoBcrearUsuario: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginEnd: '50%'
    }

})