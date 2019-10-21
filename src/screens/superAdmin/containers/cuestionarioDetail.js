import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { obtenerCuestionario, eliminarPregunta } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import { Icon } from 'react-native-elements'


class cuestionarioDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            examen: []
        };
    }


    componentDidMount() {
        const { navigation } = this.props
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                obtenerCuestionario(navigation.getParam('idExamen', ''), config).then(
                    (res) => {
                        this.setState({ examen: res.data.ResponseMessage[0], isLoading: false, })
                    }
                ).catch(
                    (err) => {
                        alert(err)
                    }
                )
            })

    }


    terminarQuiz = () => {
        alert('Quiz creado con exito')
        this.props.navigation.navigate('crudCursos')
    }


    correctaEincorrecta(valor) {
        if (valor === 1) {
            return 'green'
        }
        if (valor === 0) {
            return 'red'
        }
    }


    eliminarRespuesta = (id) => {
        alert(id)
    }

    eliminarPregunta = (id) => {
        AsyncStorage.getItem('token').then(
            (res) => {
                eliminarPregunta(id, res).then(
                    res => {
                        alert('Pregunta eliminada')
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    }

    respuestas(item, index) {
        const { value, correct, id } = item;
        return (
            <View>
                <View style={styles.view4} >
                    <View style={styles.view5} >
                        <Icon name='circle' type='font-awesome' color={this.correctaEincorrecta(correct)} size={12} />
                        <Text style={{ marginLeft: 8 }}>{value}</Text>
                    </View>
                    <View style={styles.view6}>
                        <TouchableOpacity onPress={() => { this.eliminarRespuesta(id) }} >
                            <Icon name='remove' type='font-awesome' color='red' size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }





    preguntas(item, index) {
        const { description, id } = item;
        return (
            <View >
                <View style={styles.view1} >
                    <View style={styles.view2}>
                        <Text style={styles.text1} >{index + 1}. </Text>
                        <Text >{description}</Text>
                    </View>
                    <View style={styles.view3}>
                        <TouchableOpacity onPress={() => { this.eliminarPregunta(id) }}>
                            <Icon name='trash' color='red' type='font-awesome' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={item.answers}
                        renderItem={({ item, index }) => this.respuestas(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

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

            <View style={styles.contenedor}>
                <FlatList
                    data={this.state.examen.questions}
                    renderItem={({ item, index }) => this.preguntas(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View>
                    <TouchableOpacity style={styles.TouchableOpacity1} onPress={() => { this.terminarQuiz() }} >
                        <Text>Terminar Quiz</Text>
                    </TouchableOpacity>
                </View>

            </View>

        );
    }
}

export default cuestionarioDetail;



const styles = StyleSheet.create({
    contenedor: {
        margin: '5%',

    },
    view1: {
        flexDirection: 'row',
        backgroundColor: '#E3E3E3',
        paddingTop: '5%',
        paddingBottom: '5%',
        paddingLeft: '2%',
        paddingRight: '2%',
        borderRadius: 3
    },
    view2: {
        flexDirection: 'row',
        width: '90%'
    },
    view3: {
        alignItems: 'center',
        width: '10%'
    },
    view4: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3E3'
    },
    view5: {
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',

    },
    view6: {
        width: '10%',
        alignItems: 'center'
    },
    text1: {
        marginRight: 5
    },
    TouchableOpacity1: {
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        alignItems: 'center',
        paddingBottom: 8,
        paddingTop: 8

    }
})