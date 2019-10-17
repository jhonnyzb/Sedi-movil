import React, { Component } from 'react';
import { StyleSheet, ImageBackground, View, Image, AsyncStorage } from 'react-native';
import { Card, CardItem, Text, Body, Button, Item, Input } from 'native-base';
import { login } from '../../../servicios/generales/login'

export default class AnatomyExample extends Component {

    constructor(props) {

        super(props)

        this.state = {
            email: '',
            password: '',
        }

    }


    login = () => {
        if (this.state.email === '') {
            return
        }
        if (this.state.password === '') {
            return
        }
        login(this.state.email, this.state.password).then(
            (res) => {

                if (res.data.ResponseMessage.role_id === 2) {
                    AsyncStorage.setItem('token', res.data.ResponseMessage.access_token).then(
                        res => {
                            this.setState({ email: '', password: '' })
                            this.props.navigation.navigate('inicioUsuario')
                        }).catch(
                            erro => {
                                alert('errorGuardanco')
                            }
                        )
                }
                else if (res.data.ResponseMessage.role_id === 1) {
                    AsyncStorage.setItem('token', res.data.ResponseMessage.access_token).then(
                        res => {
                            this.setState({ email: '', password: '' })
                            this.props.navigation.navigate('inicioSuperAdmin')
                        }).catch(
                            erro => {
                                alert('errorGuardanco')
                            }
                        )
                }
                else if (res.data.ResponseMessage.role_id === 3) {
                    this.props.navigation.navigate('inicioAdmin')
                }
                else {
                    alert('Error de credenciales')
                }
            }).catch(function (error) {
                alert(error)
            })

    }




    render() {

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
                                <Item rounded style={{ marginBottom: '5%', paddingStart: 8, backgroundColor: this.state.inputEmail }}>
                                    <Input placeholder='Email'
                                        onChangeText={valueEmail => this.setState({ email: valueEmail })}
                                        value={this.state.email}
                                    />
                                </Item>
                                <Item rounded rounded style={{ marginBottom: '5%', paddingStart: 8, backgroundColor: this.state.inputEmail }}>
                                    <Input placeholder='Contraseña'
                                        onChangeText={valuePassowrd => this.setState({ password: valuePassowrd })}
                                        value={this.state.password}
                                    />
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
    contrasena:
    {
        textAlign: 'center',
        width: '100%',
        fontSize: 12,
        color: '#B0AEAD'


    }

})