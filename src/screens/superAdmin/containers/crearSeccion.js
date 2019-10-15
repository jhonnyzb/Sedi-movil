import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, TextInput, Picker, Button, AsyncStorage, Alert } from 'react-native';
import CabeceraCrearSeccion from '../../general/componentes/cabeceraCrudSuperAdmin'
import { guardarSeccion } from '../../../servicios/serviciosSuperAdmin/crudCursos'
import { Icon } from 'react-native-elements'
import Footer from '../../general/componentes/footer'

class crearSeccion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreSeccion: '',
            orden: '',
            descripcion:'',
            urlVideo: '',
            tipoArchivo: ''

        };
    }

guardarSeccion=() =>{
    const { navigation } = this.props;
    AsyncStorage.getItem('token').then(
        (res) => {
            let config = { headers: { Authorization: 'Bearer ' + res } }
            guardarSeccion(this.state.nombreSeccion, navigation.getParam('idModulo', ''),this.state.orden,this.state.descripcion, this.state.urlVideo, this.state.tipoArchivo, config).then(
                res => {
                    //alert(JSON.stringify(res));
                    this.props.navigation.navigate('editarModulos')
                }).catch(
                    erro => {
                        alert(erro)
                    }
                )
        }).catch(
            (erro) => {
                alert(erro)
            }
        )
}



    render() {
        return (
            <ScrollView>
                <CabeceraCrearSeccion titulo='Crear seccion' />
                <View style={{ margin: '8%' }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3%' }}>
                        <Text style={styles.texto1}>Crear Seccion </Text>
                        <TouchableOpacity>
                            <Icon name='trash' color='red' type='font-awesome' />
                        </TouchableOpacity>
                    </View>
                    <Text>Nombre Seccion</Text>
                    <TextInput style={styles.textInput} onChangeText={ns => this.setState({ nombreSeccion: ns })} />
                    <Text>Descripcion</Text>
                    <TextInput style={styles.textInput} multiline={true} numberOfLines={2} onChangeText={des => this.setState({ descripcion: des })} />
                    <Text>Orden</Text>
                    <Picker
                        selectedValue={this.state.orden}
                        style={{ height: 50, width: '100%', backgroundColor: '#DEDEE0', marginBottom: '3%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ orden: itemValue })
                        }>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                        <Picker.Item label="7" value="7" />
                        <Picker.Item label="8" value="8" />
                    </Picker>
                    <Text>Tipo de archivo</Text>
                    <Picker
                        selectedValue={this.state.tipoArchivo}
                        style={{ height: 50, width: '100%', backgroundColor: '#DEDEE0', marginBottom:'3%' }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ tipoArchivo: itemValue })
                        }>
                        <Picker.Item label="Video" value="1" />
                        <Picker.Item label="Pdf" value="2" />
                    </Picker>
                    <Text>Url Video</Text>
                    <TextInput style={styles.textInput} onChangeText={uv => this.setState({ urlVideo: uv })}/>
                    <View style={{ marginVertical: 10 }}>
                            <Button title='Guardar Seccion' color='#ff5a06' onPress={this.guardarSeccion} />
                        </View>
                </View>
                <View>
                        <Footer/>
                </View>
            </ScrollView>

        );
    }
}

export default crearSeccion;




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