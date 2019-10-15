import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Button, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import { eliminarCurso, consultaCursosDetalles } from '../../../servicios/serviciosSuperAdmin/crudCursos';
import { Label } from "native-base";
import { Icon } from 'react-native-elements'
import Footer from '../../general/componentes/footer'


class editarCurso extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true, //true
            idCurso: '',
            nombreCurso: '',
            descripcionCurso: '',
            data: ""
        };
    }



    componentDidMount() {
        const { navigation } = this.props;
        this.pantallaEditarCursosEntrada = navigation.addListener('didFocus',()=>{
            AsyncStorage.getItem('token').then(
                (res) => {
                    const { navigation } = this.props;
                    this.setState({ idCurso: navigation.getParam('idCurso', 'error'), nombreCurso: navigation.getParam('nombreCurso', 'error'), descripcionCurso:navigation.getParam('descripcionCurso', 'error') })
                    let config = { headers: { Authorization: 'Bearer ' + res } }
                    consultaCursosDetalles(this.state.idCurso, config).then(
                        (res) => {
                            this.setState({
                                isLoading: false,
                                data: res.data[0].modules,
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


        this.pantallaEditarCursosSalida =navigation.addListener(
            'didBlur',
            () => {
                this.setState({isLoading: true})
            }
          );
        
    }


    eliminarCurso = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                eliminarCurso(this.state.idCurso, res).then(
                    res => {
                        this.props.navigation.navigate('crudCursos')
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    }

    crearModulo = () =>{
        this.props.navigation.navigate('crearModulos',{ idCurso: this.state.idCurso })
    }

    editarmodulo = (modulo) =>{
        this.props.navigation.navigate('editarModulos', { moduloEditar:modulo })
    }



    modulosSeccionesInterno(item, index) {
        //const { id, name, description, rating } = item.item;
        return (
            <TouchableOpacity>
                <View style={styles.ContenedorSecciones}>
                    <View style={{alignItems:'center', justifyContent: 'center'}}>
                        <Text>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }




    modulosSecciones(item, index) {
        //const { id, name, description, rating } = item.item;
        return (
            <View>
                <View style={styles.contenedorModulos}>
                    <View style={{ justifyContent: 'flex-start', width: '60%' }} >
                        <Text style={styles.texto1} >{item.name}</Text>
                        <Text style={styles.descripcionModulo} >{item.description}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.editarmodulo(item) }}>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', backgroundColor: '#ff5a06', borderRadius: 5, padding: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white' }}>Editar modulo</Text>
                                <Icon color="white" name="keyboard-arrow-right" type="material" size={16} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={item.sections}
                    renderItem={({ item, index }) => this.modulosSeccionesInterno(item, index)}   //{this.cursos.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
            </View>
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
                    <View style={styles.contenedorComponentes}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '2%' }}>
                            <Text style={styles.texto1} >Editar Curso</Text>
                            <Button title='eliminar' color='red' onPress={this.eliminarCurso} />
                        </View>
                        <TouchableOpacity onPress={this.crearModulo} >
                            <View style={styles.bCrearModulo}>
                                <Text style={{ color: 'white' }}>Añadir modulo</Text>
                                <Icon color="white" name="arrow-right" type="font-awesome" size={16} />
                            </View>
                        </TouchableOpacity>
                        <Label>Nombre del curso</Label>
                        <TextInput style={styles.textInput} 
                                    onChangeText={nc => this.setState({ nombreCurso: nc })}
                                    value={this.state.nombreCurso} />
                        <Label>Descripcion</Label>
                        <TextInput multiline={true}
                            numberOfLines={4}
                            style={styles.textInput}
                            onChangeText={des => this.setState({ descripcionCurso: des })} 
                            value={this.state.descripcionCurso}/>
                        <View style={{ marginVertical: 10 }}>
                            <Button title='Guardar' color='#ff5a06' onPress={this.guardarCurso} />
                        </View>
                    </View>
                    <View style={styles.modulosSecciones}>
                        <View style={styles.ContenedorModuloSecciones}>
                            <Text style={styles.texto1}>
                                Módulos y secciones
                                </Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <FlatList
                                    data={this.state.data}
                                    renderItem={({ item, index }) => this.modulosSecciones(item, index)}   //{this.cursos.bind(this)}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={this.state}
                                />
                            </View>
                        </View>
                    </View>
                    <Footer />
                </View>
            </ScrollView>

        );
    }



    componentWillUnmount() {
        //remover suscripciones a pantallas
        this.pantallaEditarCursosEntrada.remove();
        this.pantallaEditarCursosSalida.remove();
    }

}

export default editarCurso;

const styles = StyleSheet.create({
    contenedorComponentes: {
        padding: '5%'
    },
    texto1: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    bCrearModulo: {
        flexDirection: 'row',
        padding: 25,
        justifyContent: 'space-between',
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        marginBottom: '5%',
        marginTop: '5%'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
    modulosSecciones: {
        backgroundColor: '#F7F7F7'
    },
    ContenedorModuloSecciones: {
        padding: '5%'
    },
    contenedorModulos: {
        flexDirection: 'row',
        marginBottom: '5%',
        marginTop: '8%'

    },
    descripcionModulo: {
        color: '#8D8D8D'
    },
    ContenedorSecciones: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 3,
        borderRadius: 5,
        padding: 12,
    }


})