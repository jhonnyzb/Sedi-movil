import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { consultaCursosUsuario } from '../../../servicios/serviciosUsuario/consultaCursosUsuario'
import { Fab } from 'native-base';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';



class crudCursos extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true, 
            data: "" 
        
        }
    }


    componentDidMount() {
        consultaCursosUsuario().then(
            res => {
                this.setState({
                    isLoading: false,
                    data: res.data.data,
                })
            })
    }

    crearCursos = ()=>{
        this.props.navigation.navigate('crearCursos')
    }

    detalleCurso = (data) => {
      alert('detalle cursos', data)
    }

    editarCurso = (data)=>{
        alert('edicion cursos', data)
    }

    eliminarCurso = (data)=>{
        alert('eliminar cursos', data)
    }



    cursos(item) {
        const { id, first_name, last_name, email, avatar } = item.item;
        return (
            <View style={styles.vistaCursos}>
                <Text>Cursos</Text>
                <View style={{ paddingEnd: 5, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{this.detalleCurso(item)}}>
                        <Icon name='search-plus' type='font-awesome' color='#ff5a06' size={20} containerStyle={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.editarCurso(item)}}>
                        <Icon name='pencil' type='font-awesome' color='#ff5a06' size={20} containerStyle={{ marginHorizontal: 16 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{this.eliminarCurso(item)}}>
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
                <Text style={styles.texto1}>Mira tus cursos</Text>
                <Text style={styles.texto2}>Edita o agrega el que necesites</Text>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.cursos.bind(this)}
                        keyExtractor={item => item.id.toString()}
                        extraData={this.state}
                    />
                </View>
                <Fab
                    direction="up"
                    style={styles.colorFab}
                    position="bottomRight"
                    onPress = {this.crearCursos}>
                    <Icon name="add" color='white' />
                </Fab>
            </View>
        );
    }
}

export default crudCursos;

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
    vistaCursos: {
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