import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { Icon } from 'react-native-elements'
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import Footer from '../../general/componentes/footer'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            cliente: null,
            rol: null,
            tipoDocumento: '',
            numeroDocumento: '',
            nombreCompleto: '',
            email: '',
            telefono: '',
            contrasena: '',
            isLoading: false,
            datos: ['india', 'brasil', 'colombia']
        };
    }

    componentDidMount() {
        consultaClientes().then(
            res => {
                this.setState({
                    isLoading: false,
                    data: res.data,
                })
                //this.listaCliente();
            }).catch(
                err => {
                    alert(err)
                }
            )
    }


    listaCliente = () => {
        // return (this.state.data.map((x, i, y) => {
        //     return (<Picker.Item label={x.name} key={i} value={y.id} />)
        // }));
        return (this.state.datos.map((x, i) => {
            return (<Picker.Item label={x} key={i} value={x} />)
        }));
    }


    guardarCliente = () => {
        // crearUsuario_(this.state.tipoDocumento, 
        //     this.state.numeroDocumento, 
        //     this.state.nombreCompleto,
        //     this.state.email,
        //     this.state.telefono,
        //     this.state.contrasena,
        //     this.state.rol);
        this.props.navigation.navigate('crudClientes')

    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <ScrollView>
                <View >
                    <CabeceraCrearUsuario titulo='Crear licencia' />
                    <View style={styles.contenedorCliente}>
                        <Text style={styles.texto1}>Escoge un cliente</Text>
                        <Text>Toque abajo para seleccionar cliente</Text>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.cliente}
                            onValueChange={(value) => (this.setState({ cliente: value }))}>
                            {this.listaCliente()}
                        </Picker>
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Label>Numero de usuarios</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={em => this.setState({ email: em })} />
                            <Label>Precio</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={tm => this.setState({ telefono: tm })} />
                            <Label>Periodo</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={tm => this.setState({ telefono: tm })} />
                            <View style={{ marginVertical: 10 }}>
                                <Button title='Guardar licencia' color='#ff5a06' onPress={this.guardarCliente} />
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