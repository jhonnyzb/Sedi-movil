import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Alert, AsyncStorage, TouchableOpacity} from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Icon } from 'react-native-elements'
import { Picker, Label } from "native-base";
import { actualizarCliente, eliminarCliente_ } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import Footer from '../../general/componentes/footer'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreEmpresa: '',
            tipoDocumento: '0',
            numeroDocumento: '',
            email: '',
            telefono: '',
            idCliente: ''
        };
    }


    componentDidMount() {
        let cliente = this.props.navigation.getParam('cliente')
        this.setState({ nombreEmpresa: cliente.name, tipoDocumento: cliente.document_type_id, numeroDocumento: cliente.document_number, email: cliente.email, telefono: cliente.phone, idCliente: cliente.id })
    }


    tipoDocu(tipo) {
        if (tipo === 1) { return 'CC' }
        if (tipo === 2) { return 'CE' }
        if (tipo === 3) { return 'Nit' }
        if (tipo === 4) { return 'Pasaporte' }
        if (tipo === 5) { return 'Permiso especial' }
        if (tipo === 6) { return 'Rut' }
        if (tipo === 7) { return 'Tarjeta Identidad' }
    }

    editarCliente = () => {
        const { nombreEmpresa, tipoDocumento, numeroDocumento, email, telefono, idCliente } = this.state
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
                actualizarCliente(tipoDocumento, numeroDocumento, nombreEmpresa, telefono, email, idCliente, config).then(
                    res => {
                        Alert.alert('Cliente', 'Actualizado con exito', [{ text: 'Ok' }]);
                        this.props.navigation.navigate('crudClientes')
                    }).catch(
                        erro => {
                            alert(erro)
                        }
                    )
            }).catch(
                (erro) => {
                    alert('error async')
                }
            )
    }


    eliminarCliente = () => {
        Alert.alert(
            ' Seguro de eliminar' ,
            ' El cliente '  + this.state.nombreEmpresa + ' ?',
            [
                { text: 'Si', onPress: () => this.metodoEliminarCliente() },
                { text: 'No', onPress: () => console.log('Presiono No') }
            ],
            { cancelable: false },
        );
        return true;

    }



    metodoEliminarCliente() {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                eliminarCliente_(this.state.idCliente, config).then(
                    res => {
                        Alert.alert('Cliente', 'Eliminado con exito', [{ text: 'Ok' }]);
                        this.props.navigation.navigate('crudClientes')
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    }



    render() {
        return (
            <ScrollView>
                <View >
                    <CabeceraCrearUsuario titulo='Editar cliente' />
                    <View style={styles.contenedorCliente}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '4%' }} >
                            <TouchableOpacity style={styles.botones1}>
                                <Text style={styles.texto}>Ver estudiantes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botones2} onPress={this.eliminarCliente} >
                                <Icon color="white" name="trash" type="font-awesome" size={16} />
                            </TouchableOpacity>
                        </View>
                        <Label>Nombre de la empresa</Label>
                        <TextInput style={styles.textInput}
                            onChangeText={ne => this.setState({ nombreEmpresa: ne })}
                            value={this.state.nombreEmpresa} />
                        <Label>Tipo documento: {this.tipoDocu(this.state.tipoDocumento)}</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.tipoDocumento}
                            onValueChange={(value) => (this.setState({ tipoDocumento: value }))}>
                            <Picker.Item label="Seleccione otro de ser necesario" value="0" />   
                            <Picker.Item label="CC" value="1" />
                            <Picker.Item label="CE" value="2" />
                            <Picker.Item label="Nit" value="3" />
                            <Picker.Item label="Pasaporte" value="4" />
                            <Picker.Item label="Permiso Especial" value="5" />
                            <Picker.Item label="RUT" value="6" />
                            <Picker.Item label="TI" value="7" />
                        </Picker>
                        <Label>Numero documento</Label>
                        <TextInput style={styles.textInput}
                            onChangeText={nd => this.setState({ numeroDocumento: nd })}
                            value={this.state.numeroDocumento} />
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Text style={styles.texto1}>Datos de contacto</Text>
                            <Text style={{ marginBottom: 15 }}>Actualiza los datos del cliente</Text>
                            <Label>Email</Label>
                            <TextInput style={styles.textInput}
                                onChangeText={em => this.setState({ email: em })}
                                value={this.state.email} />
                            <Label>Telefono </Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'}
                                onChangeText={te => this.setState({ telefono: te })}
                                value={this.state.telefono} />
                            <TouchableOpacity style={styles.bGuardarCliente} onPress={this.editarCliente}>
                                <Text style={{ color: 'white' }} >Actualizar cliente</Text>
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
    },
    botones1: {
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        alignItems: 'center',
        padding: 15

    },
    botones2: {
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        padding: 15

    },
    texto: {
        color: 'white'
    }


})