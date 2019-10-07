import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Image } from 'react-native'
import { Card, CardItem, Text, Body, Button, Item, Input } from 'native-base';
import logueo from '../../../servicios/generales/login'

export default class AnatomyExample extends Component {
    
    login = () => {
        logueo.login()
            .then((res) => {
                if (res.data.userId === 1) {
                    this.props.navigation.navigate('inicioUsuario')
                }
                else if (res.data.userId === 2) {
                    this.props.navigation.navigate('inicioSuperAdmin')
                }
                else if (res.data.userId === 3) {
                    this.props.navigation.navigate('inicioAdmin')
                }
                else {
                    alert('Error de credenciales')
                }
            })
            .catch(function (error) {
                alert(error)
            })
    }


    render() {
        // if(this.state.isLoading){
        //     return(
        //       <View style={{flex: 1, padding: 20}}>
        //         <ActivityIndicator/>
        //       </View>
        //     )
        //   }

        // const { users } = this.state

        return (
            <ImageBackground source={require('../../../assets/img/fondoLogin.jpg')} style={{ flex: 1, width: null, height: null, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                    <Image source={require('../../../assets/img/logo.png')} />
                    <Card style={styles.card} >
                        <CardItem>
                            <Text style={styles.textCenter} >Inicia sesión</Text>
                        </CardItem>
                        <CardItem >
                            <Body>
                                <Item rounded style={styles.input}>
                                    <Input placeholder='Email' />
                                </Item>
                                <Item rounded rounded style={styles.input}>
                                    <Input placeholder='Contraseña' />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem footer>
                            <Button rounded style={styles.button} onPress={this.login}>
                                <Text>Iniciar sesion</Text></Button>
                        </CardItem>
                        <CardItem>
                            <Text style={styles.contrasena}>Olvido su contraseña?</Text>
                        </CardItem>
                    </Card>
                </View>

            </ImageBackground >
        );
    }
}



const styles = StyleSheet.create({
    textCenter: {
        textAlign: "center",
        width: '100%',
        fontSize: 18
    },
    button: {
        width: '100%',
        paddingStart: '30%',
        backgroundColor: '#DA5714'
    },
    card: {
        borderRadius: 20,
        borderWidth: 0.5,
        paddingTop: '8%',
        paddingBottom: '8%',
        marginTop: '12%'

    },
    input: {
        marginBottom: '5%',
        paddingStart: 8
    },
    contrasena:
    {
        textAlign: 'center',
        width: '100%',
        fontSize: 12,
        color: '#B0AEAD'


    }

})