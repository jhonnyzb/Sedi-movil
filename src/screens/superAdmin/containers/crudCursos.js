import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, AsyncStorage } from 'react-native';
import { consultaCursosAdmin, eliminarCurso } from '../../../servicios/serviciosSuperAdmin/crudCursos';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';



class crudCursos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, //true
            data: ""

        }
    }


    componentDidMount() {
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

    }

    crearCursos = () => {
        this.props.navigation.navigate('crearCursos')
    }

    detalleCurso = (data) => {
        alert(data)
    }

    editarCurso = (data) => {
        alert(data)
    }


    eliminarCurso = (idClase) => {
        AsyncStorage.getItem('token').then(
            (res) => {
                //let config = { headers: { Authorization: 'Bearer ' + res } }
                eliminarCurso(idClase, res).then(
                    res => {
                        alert(JSON.stringify(res))
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    }



    activoInactivo(estado) {
        if (estado === 1) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#95F79C',
                borderRadius: 7,
                padding: 5,
                borderColor: '#95F79C',
                paddingLeft: 8,
                paddingRight: 8
            }}> Activo </Text>;
        }
        else if (estado === 2) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#E3E3E3',
                borderRadius: 7,
                padding: 5,
                borderColor: '#E3E3E3',
                paddingLeft: 8,
                paddingRight: 8
            }}> Inactivo </Text>;
        }
        else if (estado === 3) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#FCFEFC',
                borderRadius: 7,
                padding: 5,
                borderColor: '#FCFEFC',
                paddingLeft: 8,
                paddingRight: 8
            }}> Aprobado </Text>;
        }
        else if (estado === 4) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#FB8989',
                borderRadius: 7,
                padding: 5,
                borderColor: '#FB8989',
                paddingLeft: 8,
                paddingRight: 8
            }}> Reprobado </Text>;
        }
        else if (estado === 5) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: '#8B89FB',
                borderRadius: 7,
                padding: 5,
                borderColor: '#8B89FB',
                paddingLeft: 8,
                paddingRight: 8
            }}> Concluido </Text>;
        }
    }



    cursos(item, index) {
        //const { id, name, description, rating } = item.item;
        return (
            <TouchableOpacity onPress={() => { this.edicion }}>
                <View style={styles.listado}>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start'}} >
                        <Text style={styles.indices} >
                            {index + 1}
                        </Text>
                        <Text style={{ marginLeft:'7%'}}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
                        {this.activoInactivo(item.status_id)}
                        <Icon color="#ff5a06" name="arrow-right" type="font-awesome" size={16} containerStyle={{marginHorizontal: '2%'}} />
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
        );
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
        borderBottomColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,

    },
    indices: {
        borderWidth: 1,
        backgroundColor: '#F8F8F8',
        borderRadius: 7,
        padding: 5,
        borderColor: '#F8F8F8',
        paddingLeft: 8,
        paddingRight: 8,
    }


})