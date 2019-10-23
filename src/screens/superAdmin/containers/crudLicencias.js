import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, AsyncStorage, FlatList } from 'react-native';
import { consultaLicencias } from '../../../servicios/serviciosSuperAdmin/crudLicencias';
import Footer from '../../general/componentes/footer'
import { Icon } from 'react-native-elements'


class crudLicencias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: ''
        };
    }



    componentDidMount() {
        const { navigation } = this.props;
        this.pantallaCrudLicenciasEntrada = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('token').then(
                (res) => {
                    let config = { headers: { Authorization: 'Bearer ' + res } }
                    consultaLicencias(config).then(
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


        this.pantallaCrudLicenciasSalida = navigation.addListener(
            'didBlur',
            () => {
                this.setState({ isLoading: true })
            }
        );
    }


    activoInactivo(estado) {
        if (estado === 2) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#95F79C',
                borderRadius: 7,
                borderColor: '#95F79C',
                width: '90%',
                textAlign: 'center'
            }}> Activa </Text>;
        }
        else {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#E3E3E3',
                borderRadius: 7,
                borderColor: '#E3E3E3',
                width: '90%',
                textAlign: 'center'
            }}> Inactiva </Text>;
        }
    }

    crearLicencia = () => {
            this.props.navigation.navigate('crearLicencias')
    }



    licencias(item, index) {
        const { licenses_number, status_id, start_date } = item
        return (
            <TouchableOpacity onPress={() => { this.editarLicencia(item) }}>
                <View style={styles.listado}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '45%' }} >
                        <Text style={styles.indices} >
                            {index + 1}
                        </Text>
                        <Text style={{ marginLeft: '7%' }}>
                            {start_date}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '40%' }}>
                        {this.activoInactivo(status_id)}
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
                    <View style={styles.contenedor}>
                        <Text style={styles.texto1}>Listado de licencias</Text>
                        <Text style={styles.texto2}>Aca podras Ver, Editar Y crear tus licencias</Text>
                        <TouchableOpacity onPress={this.crearLicencia}>
                            <View style={styles.bCrearLicencia}>
                                <Text style={{ color: 'white' }}>Crea una nueva licencia</Text>
                                <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item, index }) => this.licencias(item, index)}   //{this.cursos.bind(this)}
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
        this.pantallaCrudLicenciasEntrada.remove();
        this.pantallaCrudLicenciasSalida.remove();
    }
}

export default crudLicencias;




const styles = StyleSheet.create({
    contenedor: {
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
    bCrearLicencia: {
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
})