import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator, AsyncStorage, Picker } from 'react-native';
import CabeceraCrearLicencia from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Label } from "native-base";
import { Icon } from 'react-native-elements'
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import Footer from '../../general/componentes/footer'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            cliente: '',
            numeroUsuarios: '',
            precio: '',
            periodo: '',
            isLoading: true,
            data: ''
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                consultaClientes(config).then(
                    (res) => {
                        this.setState({
                            isLoading: false,
                            data: res.data,
                        })
                        console.log(this.state.data)
                        //this.listaCliente();
                    }
                ).catch(
                    (erro) => { alert(erro) }
                )
            }).catch(
                (erro) => {
                    alert(erro)
                })
    }


    listaCliente = () => {
        return (this.state.data.map((x, i, y) => {
            return (<Picker.Item label={x.name}  value={y.id} key={i} />)
        }));
    }


    guardarCliente = () => {
        console.log(this.state.cliente)

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
                    <CabeceraCrearLicencia titulo='Crear licencia' />
                    <View style={styles.contenedorCliente}>
                        <Text style={styles.texto1}>Escoge un cliente</Text>
                        <Text>Toque abajo para seleccionar cliente</Text>
                        <Picker
                            selectedValue={this.state.cliente}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ cliente: itemValue })
                            }>
                            {this.listaCliente()}
                        </Picker>
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Label>Numero de usuarios</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={nu => this.setState({ numeroUsuarios: nu })} />
                            <Label>Precio</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={pr => this.setState({ precio: pr })} />
                            <Label>Periodo</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={pe => this.setState({ periodo: pe })} />
                            <View style={{ marginVertical: 10 }}>
                                <Button title='Guardar licencia' color='#ff5a06' onPress={this.guardarCliente} />
                            </View>
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
    }

})