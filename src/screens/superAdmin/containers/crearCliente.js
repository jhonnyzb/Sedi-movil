import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { crearCliente } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import Footer from '../../general/componentes/footer'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreEmpresa: '',
            tipoDocumento: '',
            numeroDocumento: '',
            email: '',
            telefono: '',
        };
    }



    guardarCliente = () => {
        crearCliente(this.state.tipoDocumento,
                    this.state.numeroDocumento,
                    this.state.nombreEmpresa,
                    this.state.telefono,
                    this.state.email).then(
                        res=>{
                            alert(res)
                        }
                    ).catch(
                        erro=>{
                            alert(erro)
                        }
                    )

        //this.props.navigation.navigate('crudClientes')

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
                            <Picker.Item label="Nit" value="1" />
                            <Picker.Item label="Rut" value="2" />
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
                            <View style={{ marginVertical: 10 }}>
                                <Button title='Guardar cliente' color='#ff5a06' onPress={this.guardarCliente} />
                            </View>
                        </View>
                    </View>
                    <Footer/>
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
    }

})