import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, ActivityIndicator, AsyncStorage, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native';
import CabeceraQuiz from '../../general/componentes/cabeceraCrudSuperAdmin'
import { obtenerMetodologias, guardarMetodologia, guardarQuiz } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import Modal from "react-native-modal";
import Footer from '../../general/componentes/footer'

class crearQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCalificacion: '',
            descripcion: '',
            metodologias: '',
            isLoading: true,
            isModalVisible: false,
            nombreMetodologia: '',
            valorMaximoMetodologia: '',
            valorMinimoMetodologia: ''
        };
    }



    componentDidMount() {
        this.consultaMetodologias();
    }



    listaMetodologias = () => {
        return (this.state.metodologias.map((x, i) => {
            return (<Picker.Item label={x.name} key={i} value={x.id} />)
        }));
    }

    guardarMetodologiaNueva = () => {
        if (this.state.nombreMetodologia === '') {
            return
        }
        if (this.state.valorMaximoMetodologia === '') {
            return
        }
        this.setState({ isModalVisible: false });
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarMetodologia(this.state.nombreMetodologia, this.state.valorMaximoMetodologia, config).then(
                    res => {
                        this.setState({ nombreMetodologia: '', valorMaximoMetodologia: '' })
                        this.consultaMetodologias();
                    }).catch(
                        erro => {
                            alert('Error Guardando Metodologia')
                        }
                    )
            }).catch(
                (erro) => {
                    alert(erro)
                })
    }


    consultaMetodologias = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                obtenerMetodologias(config).then(
                    res => {
                        this.setState({ metodologias: res.data, isLoading: false })
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    }


    crearQuiz = () => {
        if (this.state.tipoCalificacion === '') {
            alert('seleccione tipo de calificacion')
            return
        }
        if (this.state.valorMinimoMetodologia === '') {
            alert('seleccione minimo de calificacion')
            return
        }
        if (this.state.descripcion === '') {
            alert('Agregue una descripcion')
            return
        }
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarQuiz(this.state.tipoCalificacion ,this.props.navigation.getParam('idQuiz', ''), this.props.navigation.getParam('idModulo', ''),  this.state.valorMinimoMetodologia, this.state.descripcion, config).then(
                    res => {
                        this.props.navigation.navigate('preguntasRespuestas', { idExamen: res.data.ResponseMessage.id} )
                    }).catch(
                        erro => {
                            alert('Error Creando Quiz')
                        }
                    )
            }).catch(
                (erro) => {
                    alert(erro)
                })
    }



    abrirModalMetodologiaNueva = () => {
        this.setState({ isModalVisible: true });
    };

    cerrarModalMetodologiaNueva = () => {
        this.setState({ isModalVisible: false });
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
                    <CabeceraQuiz titulo='Crear Quiz' />
                    <View style={styles.contenedor}>
                        <Text style={styles.texto1}>Crear Quiz Modulo</Text>
                        <Text>Tipo de calificación</Text>
                        <View style={styles.listaMetodologia}>
                            <Picker
                                selectedValue={this.state.tipoCalificacion}
                                style={{ height: 50, width: '50%', backgroundColor: '#EEEEF0 ', marginBottom: '2%', borderRadius: 5 }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ tipoCalificacion: itemValue })
                                }>
                                {this.listaMetodologias()}
                            </Picker>
                            <TouchableOpacity style={styles.agregarNuevaMetodologia} onPress={this.abrirModalMetodologiaNueva} >
                                <Text style={{ color: 'white' }}>Agregar Metodologia</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>Descripcion</Text>
                        <TextInput style={styles.textInput} multiline={true} numberOfLines={3} onChangeText={des => this.setState({ descripcion: des })}/>
                        <Text>Valor minimo para aprobar</Text>
                        <TextInput style={styles.textInput} keyboardType={'numeric'} onChangeText={valor => this.setState({ valorMinimoMetodologia: valor })} />
                        <TouchableOpacity style={styles.bAgregarQuiz} onPress={this.crearQuiz} >
                            <Text style={{ color: 'white' }}>Crear Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                    <View>
                        <Modal isVisible={this.state.isModalVisible}>
                            <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 15, }}>
                                <Text>Nombre Metodologia</Text>
                                <TextInput style={styles.textInput}
                                    onChangeText={nm => this.setState({ nombreMetodologia: nm })}
                                    value={this.state.nombreModulo} />
                                <Text>Valor Maximo Calificacion</Text>
                                <TextInput style={styles.textInput}
                                    keyboardType={'numeric'}
                                    onChangeText={valor => this.setState({ valorMaximoMetodologia: valor })}
                                    value={this.state.descripcion} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button title="Guardar metodologia" color='#ff5a06' onPress={this.guardarMetodologiaNueva} />
                                    <Button title="Cerrar" color='#ff5a06' onPress={this.cerrarModalMetodologiaNueva} />
                                </View>

                            </View>
                        </Modal>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

export default crearQuiz;



const styles = StyleSheet.create({
    contenedor: {
        margin: '8%'
    },
    listaMetodologia: {
        flexDirection: 'row',
        marginBottom: '2%',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        borderColor: '#F7F7F7',

    },
    texto1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '3%'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
    agregarNuevaMetodologia: {
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 4
    },
    bAgregarQuiz: {
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 8
    }

})