import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { Icon } from 'react-native-elements';
import { crearCliente } from '../../../servicios/serviciosSuperAdmin/crudClientes';

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
                    <View style={styles.contenedorPie}>
                        <Text style={styles.textoPie} >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit cubilia vivamus inceptos a, fermentum leo aliquet blandit mus suscipit semper cursus maecenas varius eu dis
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='facebook-official' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                            <Icon name='instagram' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                            <Icon name='twitter' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
                            <Text style={styles.textoPoliticas}>Politicas de privacidad |</Text>
                            <Text style={styles.textoPoliticas} >| Terminos y condiciones</Text>
                        </View>
                    </View>
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
    contenedorPie: {
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    textoPie: {
        color: 'white',
        textAlign: 'center',
        marginBottom: '5%'
    },
    textoPoliticas: {
        color: 'white',
        fontSize: 10,
        padding: '2%'
    },

})