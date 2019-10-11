import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, Alert, AsyncStorage} from 'react-native';
import CabeceraCrearUsuario from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Label } from "native-base";
import { guardarCurso } from  '../../../servicios/serviciosSuperAdmin/crudCursos'
import Footer from '../../general/componentes/footer'

class crearUsuario extends Component {
    constructor(props) {

        super(props);
        this.state = {
            nombreCurso: '',
            descripcion: '',
        };
    }

    guardarCurso = () => {
        AsyncStorage.getItem('token').then(
            (res)=>{
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarCurso(this.state.nombreCurso, this.state.descripcion, config).then(
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
                        <View style={{ marginVertical: 10 }}>
                                <Button  title='Guardar' color='#ff5a06' onPress={this.guardarCurso} />
                        </View>
                    </View>
                  <Footer/>
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
    }

})