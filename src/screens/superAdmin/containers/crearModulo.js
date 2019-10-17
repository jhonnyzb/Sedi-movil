import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert, AsyncStorage, Picker } from 'react-native';
import CabeceraCrearModulo from '../../general/componentes/cabeceraCrudSuperAdmin'
import { crearModulo_ } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import Footer from '../../general/componentes/footer'

class crearModulo extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreModulo: '',
            descripcion: '',
            orden:'1'
        };
    }

    guardarModulo = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                crearModulo_(this.props.navigation.getParam('idCurso', 'no-id'),this.state.nombreModulo,  this.state.descripcion, this.state.orden, config).then(
                    res => {
                        Alert.alert('Curso', 'Modulo creado con exito', [{ text: 'Ok' }]);
                        this.props.navigation.navigate('editarCursos')
                    }).catch(
                        erro => {
                            alert(erro)
                        }
                    )
            }).catch(
                (erro) => {
                    alert(erro)
                }
            )




    }

    render() {

        return (
            <ScrollView>
                <View >
                    <CabeceraCrearModulo titulo='Agregar modulo' />
                    <View style={styles.contenedorCliente}>
                        <Text>Nombre del modulo</Text>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={nm => this.setState({ nombreModulo: nm })} />
                        <Text>Descripcion</Text>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={des => this.setState({ descripcion: des })} />
                        <Text>Orden</Text>
                        <Picker
                            selectedValue={this.state.orden}
                            style={{ height: 50, width: '100%'}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ orden: itemValue })
                            }>
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                            <Picker.Item label="6" value="6" />
                            <Picker.Item label="7" value="7" />
                            <Picker.Item label="8" value="8" />

                        </Picker>
                        <View style={{ marginVertical: 10 }}>
                            <Button title='Crear Modulo' color='#ff5a06' onPress={this.guardarModulo} />
                        </View>
                    </View>
                    <Footer />
                </View>
            </ScrollView>

        );
    }
}

export default crearModulo;

const styles = StyleSheet.create({
    contenedorCliente: {
        padding: 30
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    }

})