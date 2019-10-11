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
            numeroDocumento:'',
            nombreCompleto:'',
            email:'',
            telefono:'',
            contrasena: '',
            isLoading: false,
            datos : ['india','brasil', 'colombia']
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
                err=>{
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


    guardarUsuario = ()=>{
        // crearUsuario_(this.state.tipoDocumento, 
        //     this.state.numeroDocumento, 
        //     this.state.nombreCompleto,
        //     this.state.email,
        //     this.state.telefono,
        //     this.state.contrasena,
        //     this.state.rol);
            this.props.navigation.navigate('crudUsuarios')
           
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
                    <CabeceraCrearUsuario titulo = 'Crear usuario' />
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
                            <Label>Tipo documento</Label>
                            <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={td => this.setState({ tipoDocumento: td })} />
                            <Label>Numero documento</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={nd => this.setState({ numeroDocumento: nd })} />
                            <Label>Nombre Completo</Label>
                            <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={nc => this.setState({ nombreCompleto: nc })}/>
                            <Label>Email</Label>
                            <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={em => this.setState({ email: em })} />
                            <Label>Telefono Movil</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={tm => this.setState({ telefono: tm })} />
                            <Label>Contraseña</Label>
                            <TextInput secureTextEntry={true} style={styles.textInput} placeholder='ingresa datos' onChangeText={co => this.setState({ contrasena: co })}/>
                            <Label>Repetir contraseña</Label>
                            <TextInput secureTextEntry={true} style={styles.textInput} placeholder='ingresa datos' />
                            <Label>Rol</Label>
                            <Picker
                                mode="dropdown"
                                style={{ backgroundColor: 'white' }}
                                selectedValue={this.state.rol}
                                onValueChange={(value) => (this.setState({ rol: value }))}>
                                <Picker.Item label="Admin" value="admin" />
                                <Picker.Item label="Cliente" value="cliente" />
                                <Picker.Item label="Usuario" value="usuario" />
                            </Picker>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ color: '#ff5a06', marginBottom: 8 }} >*Cupos disponibles: 3 </Text>
                                <Button  title='Guardar' color='#ff5a06' onPress={this.guardarUsuario} />
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
        marginBottom: 10
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
    botonGuardar: {
        backgroundColor: '#ff5a06',
        padding: 10,
        borderRadius: 5
    }
   
})