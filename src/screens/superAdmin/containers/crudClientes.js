import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements'
import Footer from '../../general/componentes/footer'
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';




class crudClientes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: ''
        }
    }


    componentDidMount() {
        const { navigation } = this.props;
        this.pantallaCrudClientesEntrada = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('token').then(
                (res) => {
                    let config = { headers: { Authorization: 'Bearer ' + res } }
                    consultaClientes(config).then(
                        (res) => {
                            this.setState({
                                isLoading: false,
                                data: res.data,
                            })
                        }
                    ).catch(
                        (erro) => { alert(erro) }
                    )
                }).catch(
                    (erro) => {
                        alert(erro)
                    })

        });


        this.pantallaCrudClienteSalida = navigation.addListener(
            'didBlur',
            () => {
                this.setState({ isLoading: true })
            }
        );
    }




    crearCliente = () => {
        this.props.navigation.navigate('crearClientes')
    }

    editarCliente = (Cliente) => {
        this.props.navigation.navigate('editarClientes',{ cliente: Cliente })
    }


    activoInactivo(estado) {
        if (estado === 1) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#95F79C',
                borderRadius: 7,
                borderColor: '#95F79C',
                width: '90%',
                textAlign: 'center'
            }}> Activo </Text>;
        }
        else if (estado === 2) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#E3E3E3',
                borderRadius: 7,
                borderColor: '#E3E3E3',
                width: '90%',
                textAlign: 'center'
            }}> Inactivo </Text>;
        }
        else if (estado === 9) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#FCFEFC',
                borderRadius: 7,
                borderColor: '#FCFEFC',
                width: '90%',
                textAlign: 'center'
            }}> Pendiente</Text>;
        }
    }



    clientes(item, index) {
        return (
            <TouchableOpacity onPress={() => { this.editarCliente(item) }}>
                <View style={styles.listado}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '45%' }} >
                        <Text style={styles.indices} >
                            {index + 1}
                        </Text>
                        <Text style={{ marginLeft: '7%' }}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '40%'}}>
                        {this.activoInactivo(item.status_id)}
                        <Icon color="#ff5a06" name="keyboard-arrow-right" type="material" size={16} containerStyle={{ marginLeft: '12%' }} />
                    </View>
                </View>
            </TouchableOpacity>

        )
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
                <View>
                    <View style={styles.container}>
                        <Text style={styles.texto1}>Listado de clientes</Text>
                        <Text style={styles.texto2}>Aca podras Ver, Editar Y crear tus clientes</Text>
                        <TouchableOpacity onPress={this.crearCliente}>
                            <View style={styles.bCrearCliente}>
                                <Text style={{ color: 'white' }}>Crea un Nuevo cliente</Text>
                                <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item, index }) => this.clientes(item, index)}   //{this.cursos.bind(this)}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                            />
                        </View>
                    </View>
                    <View>
                        <Footer />
                    </View>

                </View>
            </ScrollView>
        );
    }


    componentWillUnmount() {
        //remover suscripciones a pantallas
        this.pantallaCrudClientesEntrada.remove();
        this.pantallaCrudClienteSalida.remove();
    }
}

export default crudClientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: '5%',
        paddingEnd: '5%',
        paddingTop: 10
    },
    texto1: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    texto2: {
        color: '#C8C3C3',
        marginBottom: '4%'
    },
    bCrearCliente: {
        flexDirection: 'row',
        padding: 25,
        justifyContent: 'space-between',
        backgroundColor: '#ff5a06',
        borderRadius: 5
    },
    listado: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        marginBottom: '5%',
        borderBottomColor: '#CCCCD1',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,

    },
    indices: {
        borderWidth: 1,
        backgroundColor: '#CCCCD1',
        borderRadius: 7,
        padding: 5,
        borderColor: '#CCCCD1',
        paddingLeft: 8,
        paddingRight: 8,
    }
});