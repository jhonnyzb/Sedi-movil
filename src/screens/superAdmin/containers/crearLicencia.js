import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, ActivityIndicator, AsyncStorage, Picker } from 'react-native';
import CabeceraCrearLicencia from '../../general/componentes/cabeceraCrudSuperAdmin'
import { Label, DatePicker } from "native-base";
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import { consultaLicenciaCliente, guardarLicencia } from '../../../servicios/serviciosSuperAdmin/crudLicencias'
import Footer from '../../general/componentes/footer'
import moment from "moment";

class crearUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chosenDate:'',
            cliente: '',
            numeroUsuarios: '',
            precio: '',
            periodo: '',
            isLoading: true,
            data: '',
            ultimaLicencia: '',
            ano: '',
            mes: '',
            dia: ''
        };
        this.setDate = this.setDate.bind(this);
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                consultaClientes(config).then(
                    (res) => {
                        this.setState({
                            isLoading: false,
                            data: res.data,
                        })
                        //this.listaCliente();
                    }
                ).catch(
                    (erro) => { alert(erro) }
                )
            }).catch(
                (erro) => {
                    alert(erro)
                })
    }


    consultaLicencias_ = (itemValue) => {
        this.setState({ cliente: itemValue })
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                consultaLicenciaCliente(itemValue, config).then(
                    (res) => {
                        if (res.data.ResponseMessage.finish_date === undefined) {
                            this.setState({
                                ano: moment().year(),
                                mes: moment().month(),
                                dia: moment().day()
                            })
                        }
                        else {
                            var date = moment(res.data.ResponseMessage.finish_date, 'YYYY/MM/DD');
                            this.setState({
                                ano: date.format('YYYY'),
                                mes: date.format('M'),
                                dia: date.format('D')
                            })
                        }
                    }
                ).catch(
                    (erro) => { console.log(erro) }
                )
            }).catch(
                (erro) => {
                    alert(erro)
                })

    }



    listaCliente = () => {
        return (this.state.data.map((x, i) => {
            return (<Picker.Item label={x.name} value={x.id} key={i} />)
        }));
    }


    guardarlicencia = () => {
        AsyncStorage.getItem('token').then(
            (res) => {
                let config = { headers: { Authorization: 'Bearer ' + res } }
                guardarLicencia(this.state.cliente,this.state.periodo,this.state.numeroUsuarios,this.state.precio,this.state.chosenDate, config).then(
                    (res) => {
                     console.log('res',res)
                    }
                ).catch(
                    (erro) => { console.log('catch',erro) }
                )
            }).catch(
                (erro) => {
                    alert(erro)
                })

    }

    setDate(newDate) {
        let fechaFormateada = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate()
        this.setState({ chosenDate: fechaFormateada });
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
                <View >
                    <CabeceraCrearLicencia titulo='Crear licencia' />
                    <View style={styles.contenedorCliente}>
                        <Text style={styles.texto1}>Escoge un cliente</Text>
                        <Text>Toque abajo para seleccionar cliente</Text>
                        <Picker
                            selectedValue={this.state.cliente}
                            onValueChange={(itemValue, itemIndex) =>
                                this.consultaLicencias_(itemValue)
                            }>
                            {this.listaCliente()}
                        </Picker>
                    </View>
                    <View style={styles.contenedorDatosUsuario}>
                        <View style={styles.contenedorCliente}>
                            <Label>Numero de usuarios</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={nu => this.setState({ numeroUsuarios: nu })} />
                            <Label>Precio</Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={pr => this.setState({ precio: pr })} />
                            <Label>Periodo (Meses) </Label>
                            <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder='ingresa datos' onChangeText={pe => this.setState({ periodo: pe })} />
                            <Label>Fecha de inicio </Label>
                            <DatePicker
                                defaultDate={new Date()}
                                minimumDate={new Date(this.state.ano, this.state.mes - 1, this.state.dia)}
                                maximumDate={new Date(2050, 12, 31)}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Seleccione Fecha"
                                textStyle={{ color: "black" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                            <View style={{ marginVertical: 10 }}>
                                <Button title='Guardar licencia' color='#ff5a06' onPress={this.guardarlicencia} />
                            </View>
                        </View>
                    </View>
                    <Footer />
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
    texto1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contenedorDatosUsuario: {
        backgroundColor: '#F7F7F7'
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