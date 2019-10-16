import React, { Component } from 'react';
import { StyleSheet, Text, View, Picker, ActivityIndicator, AsyncStorage, TextInput, ScrollView, TouchableOpacity, Button} from 'react-native';
import CabeceraQuiz from '../../general/componentes/cabeceraCrudSuperAdmin'
import { obtenerMetodologias } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import Modal from "react-native-modal";
import Footer from '../../general/componentes/footer'

class crearQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipoCalificacion: '',
            metodologias: '',
            isLoading: true,
            isModalVisible: false,
        };
    }



    componentDidMount() {
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



    listaMetodologias = () => {
        return (this.state.metodologias.map((x, i) => {
            return (<Picker.Item label={x.name} key={i} value={x.id} />)
        }));
    }

    metodologiaNueva = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

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
                            <TouchableOpacity style={styles.agregarNuevaMetodologia} onPress={this.metodologiaNueva} >
                                <Text style={{ color: 'white' }}>Agregar Metodologia</Text>
                            </TouchableOpacity>
                        </View>
                        <Text>Descripcion</Text>
                        <TextInput style={styles.textInput} multiline={true} numberOfLines={3} />
                        <Text>Valor minimo de aprobacion</Text>
                        <TextInput style={styles.textInput} keyboardType={'numeric'} />
                        <TouchableOpacity style={styles.bAgregarQuiz}>
                            <Text style={{ color: 'white' }}>Crear Quiz</Text>
                        </TouchableOpacity>
                    </View>
                    <Footer />
                    <View>
                        <Modal isVisible={this.state.isModalVisible}>
                            <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 15, }}>
                                <Text>Nombre Modulo</Text>
                                <TextInput style={styles.textInput}
                                    onChangeText={nm => this.setState({ nombreModulo: nm })}
                                    value={this.state.nombreModulo} />
                                <Text>Descripcion</Text>
                                <TextInput style={styles.textInput}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={des => this.setState({ descripcion: des })}
                                    value={this.state.descripcion} />
                                <Button title="Guardar metodologia" color='#ff5a06' onPress={this.metodologiaNueva} />
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