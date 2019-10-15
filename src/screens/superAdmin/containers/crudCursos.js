import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, AsyncStorage, ScrollView } from 'react-native';
import { consultaCursosAdmin, eliminarCurso } from '../../../servicios/serviciosSuperAdmin/crudCursos';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Footer from '../../general/componentes/footer'



class crudCursos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, //true
            data: ""

        }
    }


    componentDidMount() {
        const { navigation } = this.props;
        this.pantallaCrudCursosEntrada = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('token').then(
                (res) => {
                    let config = { headers: { Authorization: 'Bearer ' + res } }
                    consultaCursosAdmin(config).then(
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
                        alert('error asyn')
                    })

        });


        this.pantallaCrudCursosSalida =navigation.addListener(
            'didBlur',
            () => {
                this.setState({isLoading: true})
            }
          );
    }





    crearCursos = () => {
        this.props.navigation.navigate('crearCursos')
    }

    editarCurso = (idCurso, nombreCurso, descripcionCurso) => {
        this.props.navigation.navigate('editarCursos', { idCurso: idCurso, nombreCurso: nombreCurso, descripcionCurso: descripcionCurso })
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
        else if (estado === 3) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#FCFEFC',
                borderRadius: 7,
                borderColor: '#FCFEFC',
                width: '90%',
                textAlign: 'center'
            }}> Aprobado </Text>;
        }
        else if (estado === 4) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#FB8989',
                borderRadius: 7,
                borderColor: '#FB8989',
                width: '90%',
                textAlign: 'center'
            }}> Reprobado </Text>;
        }
        else if (estado === 5) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#8B89FB',
                borderRadius: 7,
                borderColor: '#8B89FB',
                width: '90%',
                textAlign: 'center'
            }}> Concluido </Text>;
        }
        else if (estado === 7) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#6E99FD',
                borderRadius: 7,
                borderColor: '#6E99FD',
                width: '90%',
                textAlign: 'center'
            }}> En proceso </Text>;
        }
    }



    cursos(item, index) {
        //const { id, name, description, rating } = item.item;
        return (
            <TouchableOpacity onPress={() => { this.editarCurso(item.id, item.name, item.description) }}>
                <View style={styles.listado}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '45%' }} >
                        <Text style={styles.indices} >
                            {index + 1}
                        </Text>
                        <Text style={{ marginLeft: '7%' }}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '40%' }}>
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
                        <Text style={styles.texto1}>Listado de cursos</Text>
                        <Text style={styles.texto2}>Aca podras Ver, Editar Y crear Cursos</Text>
                        <TouchableOpacity onPress={this.crearCursos} >
                            <View style={styles.bCrearCurso}>
                                <Text style={{ color: 'white' }}>Crea un Curso</Text>
                                <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item, index }) => this.cursos(item, index)}   //{this.cursos.bind(this)}
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
        this.pantallaCrudCursosEntrada.remove();
        this.pantallaCrudCursosSalida.remove();
    }



}

export default crudCursos;

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
    bCrearCurso: {
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