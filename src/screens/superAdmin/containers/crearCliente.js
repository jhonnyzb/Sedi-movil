import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator } from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { Icon } from 'react-native-elements'
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import { crearUsuario_ } from '../../../servicios/serviciosSuperAdmin/crudUsuarios'

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
                    <CabeceraCrearUsuario titulo='Crear cliente' />
                    <View style={styles.contenedorCliente}>
                        <Label>Nombre de la empresa</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.cliente}
                            onValueChange={(value) => (this.setState({ cliente: value }))}>
                            {this.listaCliente()}
                        </Picker>
                        <Label>Tipo documento</Label>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={td => this.setState({ tipoDocumento: td })} />
                        <Label>Numero documento</Label>
                        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={nd => this.setState({ numeroDocumento: nd })} />
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Text style={styles.texto1}>Datos de contacto</Text>
                            <Text style={{marginBottom:15}}>Completa los datos del cliente</Text>
                            <Label>Email</Label>
                            <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={em => this.setState({ email: em })} />
                            <Label>Telefono Movil</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={tm => this.setState({ telefono: tm })} />
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