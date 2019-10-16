import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput, Picker, Button, AsyncStorage, Alert } from 'react-native';
import { Video } from 'expo-av';
import { eliminarSeccion, consultarSeccionIndividual, actualizarSeccion } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import CabeceraCrearSeccion from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Icon } from 'react-native-elements'
import Footer from '../../general/componentes/footer'


class editarSeccion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreSeccion: '',
            descripcion: '',
            urlVideo: ''

        };
    }


    componentDidMount() {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                consultarSeccionIndividual(this.props.navigation.getParam('idSeccion', ''), config).then(
                    res => {
                        this.setState({ nombreSeccion: res.data.name, descripcion: res.data.description, urlVideo: res.data.files[0].value })
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })

    }

    eliminarSeccion = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                eliminarSeccion(this.props.navigation.getParam('idSeccion', ''), res).then(
                    res => {
                        this.props.navigation.navigate('editarModulos', { banderahttp: 2 })
                    }).catch(
                        erro => {
                            alert(JSON.stringify(erro))
                        })
            }).catch(
                (erro) => {
                    alert('error asyn')
                })
    };


    actualizarSeccion = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                actualizarSeccion(this.state.nombreSeccion, this.props.navigation.getParam('idModulo', ''), 4, this.state.descripcion, this.props.navigation.getParam('idSeccion', ''), config).then(
                    res => {
                        this.props.navigation.navigate('editarModulos', { banderahttp: 2 })
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
        //, headers: { Authorization: 'Bearer '}
        return (
            <ScrollView>
                <Video
                    source={{ uri: 'http://10.133.10.157:9000/vod/sample3.mp4/playlist.m3u8'}}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    useNativeControls={true}
                    style={{ width: '100%', height: 250 }}
                />
                <View style={{ margin: '8%' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%' }}>
                        <Text style={styles.texto1}>Editar Seccion </Text>
                        <TouchableOpacity onPress={() => this.eliminarSeccion()} >
                            <Icon name='trash' color='red' type='font-awesome' />
                        </TouchableOpacity>
                    </View>
                    <Text>NOMBRE SECCION</Text>
                    <TextInput style={styles.textInput} onChangeText={ns => this.setState({ nombreSeccion: ns })} value={this.state.nombreSeccion} />
                    <Text>DESCRIPCION</Text>
                    <TextInput style={styles.textInput} multiline={true} numberOfLines={2} onChangeText={des => this.setState({ descripcion: des })} value={this.state.descripcion} />
                    <Text>URL VIDEO</Text>
                    <TextInput style={styles.textInput} onChangeText={uv => this.setState({ urlVideo: uv })} value={this.state.urlVideo} />
                    <TouchableOpacity onPress={() => { this.actualizarSeccion() }} style={{ marginVertical: 10, alignItems: 'center', backgroundColor: '#ff5a06', borderRadius: 5, padding: 8 }} >
                        <Text style={{ color: 'white' }} >Actualizar seccion</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Footer />
                </View>
            </ScrollView>

        );
    }
}

export default editarSeccion;


const styles = StyleSheet.create({

    texto1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },

})