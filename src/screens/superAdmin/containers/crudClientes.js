import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { consultaCursosUsuario } from '../../../servicios/serviciosUsuario/consultaCursosUsuario';
import { consultaClientes } from '../../../servicios/serviciosSuperAdmin/crudClientes';
import { Fab } from 'native-base';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';



class crudClientes extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            data: "" 
        
        }
    }


    componentDidMount() {
        consultaClientes().then(
            res => {
                this.setState({
                    isLoading: false,
                    data: res.data,
                })
            })
    }

    crearCliente = ()=>{
        this.props.navigation.navigate('crearClientes')
    }

    detalleCliente = (data) => {
      alert('detalle cliente', data)
    }

    editarCliente = (data)=>{
        alert('edicion cleinte', data)
    }

    eliminarCliente = (data)=>{
        alert('eliminar cleinte', data)
    }



    clientes(item) {
        const { id, fdocument_type_id, document_number, name, phone, email } = item.item;
        return (
            <View style={styles.vistaClientes}>
                <Text>{name}</Text>
                <View style={{ paddingEnd: 5, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{this.detalleCliente(item)}}>
                        <Icon name='search-plus' type='font-awesome' color='#ff5a06' size={20} containerStyle={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.editarCliente(item)}}>
                        <Icon name='pencil' type='font-awesome' color='#ff5a06' size={20} containerStyle={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.eliminarCliente(item)}}>
                        <Icon name='trash-o' type='font-awesome' color='#ff5a06' size={20} containerStyle={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
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
            <View style={styles.container}>
                <Text style={styles.texto1}>Mira tus clientes</Text>
                <Text style={styles.texto2}>Edita o agrega el que necesites</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.clientes.bind(this)}
                        keyExtractor={item => item.id.toString()}
                        extraData={this.state}
                    />
                </View>
                <Fab
                    direction="up"
                    style={styles.colorFab}
                    position="bottomRight"
                    onPress = {this.crearCliente}>
                    <Icon name="add" color='white' />
                </Fab>
            </View>
        );
    }
}

export default crudClientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingStart: '10%',
        paddingEnd: '10%',
        paddingTop: 10
    },
    texto1: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    vistaClientes: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C8C3C3',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    texto2: {
        color: '#C8C3C3'
    },
    colorFab: {
        backgroundColor: '#ff5a06'
    }


})