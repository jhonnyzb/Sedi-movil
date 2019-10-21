import React, { Component } from 'react';
import { StyleSheet, Text, Button, FlatList, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { guardarPreguntasQuiz } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'



class index extends Component {
    constructor(props) {
        super(props);
        this.con = 0
        this.state = {
            colorIcon: 'black',
            colorbotonCorrecto: 'gray',
            colorbotonIncorrecto: 'gray',
            pregunta: '',
            peso: '',
            respuestas: [],
            isModalVisible: false,
            resModal: '',
            correcModal: ''

        };
    }


    addRespuesta = () => {
        if (this.state.resModal === '') {
            return
        }
        if (this.state.correcModal === '') {
            return
        }
        respuesta = {
            value: this.state.resModal,
            correct: this.state.correcModal
        }
        var nuevoEstadoArreglo = this.state.respuestas.slice();
        nuevoEstadoArreglo.push(respuesta);
        this.setState({
            respuestas: nuevoEstadoArreglo,
            isModalVisible: false,
            resModal: '',
            correcModal: '',
            colorIcon: 'black',
            colorbotonCorrecto: 'gray',
            colorbotonIncorrecto: 'gray'
        });

    }

    eliminarRespuesta = (index) => {
        var array = [...this.state.respuestas]; // make a separate copy of the array
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({ respuestas: array });
        }
    }


    guardarPregunta = () => {
        const { navigation } = this.props;
        const { pregunta, peso, respuestas } = this.state
        if (pregunta === '') {
            alert('Campo pregunta vacio')
            return
        }
        if (peso === '') {
            alert('Campo peso vacio')
            return
        }
        if (respuestas.length === 0) {
            alert('No hay respuestas a su pregunta')
            return
        }
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarPreguntasQuiz(navigation.getParam('idExamen', ''), pregunta, peso, respuestas, config).then(
                    res => {
                        alert('pregunta Guardada')
                        this.setState({ pregunta: '', peso: '', respuestas: []})
                        this.con = this.con + 1 
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





    mostrarModal = () => {
        if (this.state.pregunta === '') {
            alert('Por favor formule una pregunta')
            return
        }
        if (this.state.peso === '') {
            alert('Por favor de un peso a pregunta')
            return
        }
        this.setState({ isModalVisible: true })
    }

    cerrarModal = () => {
        this.setState({
            isModalVisible: false, resModal: '',
            correcModal: '',
            colorIcon: 'black',
            colorbotonCorrecto: 'gray',
            colorbotonIncorrecto: 'gray'
        })
    }


    correctoEincorrecto(index, correct) {
        if (correct === 1) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: 'green',
                borderRadius: 20,
                padding: 3,
                borderColor: 'green',
                paddingLeft: 8,
                paddingRight: 8,
                color: 'white'
            }}> {index + 1} </Text>;
        }
        if (correct === 0) {
            return <Text style={{
                borderWidth: 1,
                backgroundColor: 'red',
                borderRadius: 20,
                padding: 3,
                borderColor: 'red',
                paddingLeft: 8,
                paddingRight: 8,
                color: 'white'
            }}> {index + 1} </Text>;
        }
    }


    noHayPreguntas(contador) {
        if (this.state.respuestas.length === 0) {
            return <View style={{ justifyContent: 'center', alignItems: 'center', height: '70%' }}>
                <Icon name='info-circle' type='font-awesome' color='red' size={100} />
                <Text>Usted ha generado { contador} preguntas para este modulo</Text>
            </View>
        }
    }

    respuestas_(item, index) {
        //const { id, name, description, rating } = item.item;
        return (
            <View style={{ flexDirection: 'row', marginTop: 15, marginBottom: 15, }}>
                {this.correctoEincorrecto(index, item.correct)}
                <Text style={{ marginLeft: '8%', marginRight: '8%', width: '60%', paddingHorizontal: 3, paddingVertical: 5, borderBottomColor: '#CCCCD1', borderBottomWidth: 1 }}>{item.value}</Text>
                <TouchableOpacity onPress={() => { this.eliminarRespuesta(index) }}>
                    <Icon name='trash' type='font-awesome' color='red' />
                </TouchableOpacity>
            </View>
        )
    }


    correctoIncorrecto = (correc) => {
        if (correc === 1) {
            this.setState({ colorbotonCorrecto: 'green', colorIcon: 'white', correcModal: 1 })
        } else {
            this.setState({ colorbotonIncorrecto: 'red', colorIcon: 'white', correcModal: 0 })
        }

    }


    verCuestionario = () => {
        const { navigation } = this.props;
        navigation.navigate('cuestionarioDetalles', { idExamen: navigation.getParam('idExamen', '') })
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                    <View style={{ width: '83%', marginRight: 2 }}>
                        <Text>Pregunta</Text>
                        <TextInput style={{ borderRadius: 5, borderWidth: 1, paddingHorizontal: 3, borderColor: '#CCCCD1' }} onChangeText={pre => this.setState({ pregunta: pre })} value={this.state.pregunta} />
                    </View>
                    <View style={{ width: '17%' }}>
                        <Text>Peso</Text>
                        <TextInput keyboardType={'numeric'} maxLength={5} style={{ borderRadius: 5, borderWidth: 1, paddingHorizontal: 3, borderColor: '#CCCCD1', textAlign: 'center' }} onChangeText={pe => this.setState({ peso: pe })} value={this.state.peso} />
                    </View>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#ff5a06', padding: 10, alignItems: 'center', borderRadius: 5 }} onPress={() => { this.mostrarModal() }} >
                    <Text style={{ color: 'white' }}>agregar respuesta</Text>
                </TouchableOpacity>
                {this.noHayPreguntas(this.con)}
                <FlatList
                    data={this.state.respuestas}
                    renderItem={({ item, index }) => this.respuestas_(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    extraDa ta={this.state}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={{ backgroundColor: '#ff5a06', padding: 10, alignItems: 'center', borderRadius: 5, marginBottom: 3 }} onPress={() => { this.guardarPregunta() }}  >
                        <Text style={{ color: 'white' }}>Guardar pregunta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#ff5a06', padding: 10, alignItems: 'center', borderRadius: 5 }} onPress={() => { this.verCuestionario() }}  >
                        <Text style={{ color: 'white' }}>Ver cuestionario</Text>
                    </TouchableOpacity>
                </View>



                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ backgroundColor: 'white', borderRadius: 5, padding: '8%' }}>
                        <View style={{ alignItems: 'center', margin: 5 }}>
                            <Text>RESPUESTA</Text>
                        </View>
                        <TextInput style={styles.textInput}
                            onChangeText={res => this.setState({ resModal: res })}
                            value={this.state.resModal}
                            multiline={true}
                            numberOfLines={2} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: '12%' }}>
                            <TouchableOpacity style={{ width: '40%', backgroundColor: this.state.colorbotonCorrecto, borderRadius: 5, justifyContent: 'center' }}
                                onPress={() => { this.correctoIncorrecto(1) }}  >
                                <Icon
                                    name='check'
                                    type='font-awesome'
                                    color={this.state.colorIcon}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '40%', backgroundColor: this.state.colorbotonIncorrecto, borderRadius: 5, justifyContent: 'center' }}
                                onPress={() => { this.correctoIncorrecto(0) }}>
                                <Icon
                                    name='times'
                                    type='font-awesome'
                                    color={this.state.colorIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Guardar respuesta" color='#ff5a06' onPress={this.addRespuesta} />
                            <Button title="Cerrar" color='#ff5a06' onPress={this.cerrarModal} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default index;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '2%',
        padding: 10
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
    indices: {
        borderWidth: 1,
        backgroundColor: '#CCCCD1',
        borderRadius: 20,
        padding: 3,
        borderColor: '#CCCCD1',
        paddingLeft: 8,
        paddingRight: 8,
    }
});
