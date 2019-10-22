import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, AsyncStorage } from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { crearCliente } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import Footer from '../../general/componentes/footer'
import { TouchableOpacity } from 'react-native-gesture-handler';

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreEmpresa: '',
            tipoDocumento: '0',
            numeroDocumento: '',
            email: '',
            telefono: '',
        };
    }



    guardarCliente = () => {
        const { nombreEmpresa, tipoDocumento, numeroDocumento, email, telefono } = this.state
        let expresionEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (nombreEmpresa === '') {
            Alert.alert('Alerta', 'Falta Campo nombre de la empresa', [{ text: 'Ok' }]);
            return
        }
        if (tipoDocumento === '0') {
            Alert.alert('Alerta', 'Falta Campo tipo de documento', [{ text: 'Ok' }]);
            return
        }
        if (numeroDocumento === '') {
            Alert.alert('Alerta', 'Falta Campo numero Documento', [{ text: 'Ok' }]);
            return
        }
        if (email === '') {
            Alert.alert('Alerta', 'Falta Campo email', [{ text: 'Ok' }]);
            return
        }
        if (expresionEmail.test(email) === false) {
            Alert.alert('Alerta', 'Email incorrecto', [{ text: 'Ok' }]);
            return
        }
        if (telefono === '') {
            Alert.alert('Alerta', 'Falta Campo telefono', [{ text: 'Ok' }]);
            return
        }
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                crearCliente(tipoDocumento, numeroDocumento, nombreEmpresa, telefono, email, config).then(
                    res => {
                        Alert.alert('Cliente', 'creado con exito', [{ text: 'Ok' }]);
                        this.props.navigation.navigate('crudClientes')
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
                    <CabeceraCrearUsuario titulo='Crear cliente' />
                    <View style={styles.contenedorCliente}>
                        <Label>Nombre de la empresa</Label>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={ne => this.setState({ nombreEmpresa: ne })} />
                        <Label>Tipo documento</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.tipoDocumento}
                            onValueChange={(value) => (this.setState({ tipoDocumento: value }))}>
                            <Picker.Item label="Seleccione opcion" value="0" />
                            <Picker.Item label="CC" value="1" />
                            <Picker.Item label="CE" value="2" />
                            <Picker.Item label="Nit" value="3" />
                            <Picker.Item label="Pasaporte" value="4" />
                            <Picker.Item label="Permiso Especial" value="5" />
                            <Picker.Item label="RUT" value="6" />
                            <Picker.Item label="TI" value="7" />
                        </Picker>
                        <Label>Numero documento</Label>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={nd => this.setState({ numeroDocumento: nd })} />
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Text style={styles.texto1}>Datos de contacto</Text>
                            <Text style={{ marginBottom: 15 }}>Completa los datos del cliente</Text>
                            <Label>Email</Label>
                            <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={em => this.setState({ email: em })} />
                            <Label>Telefono </Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={te => this.setState({ telefono: te })} />
                            <TouchableOpacity style={styles.bGuardarCliente} onPress={this.guardarCliente}>
                                <Text style={{ color: 'white' }} >Guardar cliente</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <Footer />
                </View>
            </ScrollView>

        );
    }
}

export default crearUsuario;

const styles = StyleSheet.create({
    contenedorCliente: {
        padding: 30
    },
    texto1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contenedorDatosUsuario: {
        backgroundColor: '#F7F7F7'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
    bGuardarCliente: {
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: '3%'

    }

})