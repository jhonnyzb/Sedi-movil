import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert, AsyncStorage} from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Picker, Label } from "native-base";
import { Icon } from 'react-native-elements'
import { guardarCurso } from  '../../../servicios/serviciosSuperAdmin/crudCursos'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreCurso: '',
            descripcion: '',
            estado: ''

        };
    }

    guardarCurso = () => {
        AsyncStorage.getItem('token').then(
            (res)=>{
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarCurso(this.state.nombreCurso, this.state.descripcion, this.state.estado, config).then(
                    res => { 
                      Alert.alert('Curso', 'creado con exito', [{text: 'Ok'}]);
                      this.props.navigation.navigate('crudCursos')
                  }).catch(
                      erro=> {
                          alert(erro)
                      }
                  )
            }).catch(
                (erro)=>{
                    alert(erro)
                }
            )


        

    }

    render() {

        return (
            <ScrollView>
                <View >
                    <CabeceraCrearUsuario titulo='Crear curso' />
                    <View style={styles.contenedorCliente}>
                        <Label>Nombre del curso</Label>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={nc => this.setState({ nombreCurso: nc })} />
                        <Label>Descripcion</Label>
                        <TextInput style={styles.textInput} placeholder='ingresa datos' onChangeText={des => this.setState({ descripcion: des })} />
                        <Label>Estado</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.estado}
                            onValueChange={(value) => (this.setState({ estado: value }))}>
                            <Picker.Item label="Activo" value="1" />
                            <Picker.Item label="En proceso" value="2" />
                            <Picker.Item label="Inactivo" value="3" />
                        </Picker>
                        <View style={{ marginVertical: 10 }}>
                                <Button  title='Guardar' color='#ff5a06' onPress={this.guardarCurso} />
                        </View>
                    </View>
                    <View style={styles.contenedorPie}>
                        <Text style={styles.textoPie} >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit cubilia vivamus inceptos a, fermentum leo aliquet blandit mus suscipit semper cursus maecenas varius eu dis
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name='facebook-official' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                            <Icon name='instagram' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                            <Icon name='twitter' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
                            <Text style={styles.textoPoliticas}>Politicas de privacidad |</Text>
                            <Text style={styles.textoPoliticas} >| Terminos y condiciones</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

        );
    }
}

export default crearUsuario;

const styles = StyleSheet.create({
    contenedorCliente: {
        padding: 30
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
    contenedorPie: {
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    textoPie: {
        color: 'white',
        textAlign: 'center',
        marginBottom: '5%'
    },
    textoPoliticas: {
        color: 'white',
        fontSize: 10,
        padding: '2%'
    },

})