import React, { Component } from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View, TextInput, AsyncStorage } from 'react-native';
import { consultarSecciones} from '../../../servicios/serviciosSuperAdmin/crudCursos'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { Icon } from 'react-native-elements'
import Modal from "react-native-modal";

class nosotros extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isModalVisible: false,
            nombreModulo: '',
            descripcion: '',
            idModulo:''

        };
    }


    // enviar = (data) => {
    //     let arra = data.map((id, index) => ({
    //         orden: index + 1,
    //         idSeccion: id.label
    //     }))
    //     alert(JSON.stringify(arra))
    // }

    componentDidMount() {
        this.pantallaEditarModuloEntrada = this.props.navigation.addListener('didFocus', ()=>{
            let secciones = this.props.navigation.getParam('moduloEditar', 'NO-ID')
            let bandera = this.props.navigation.getParam('banderahttp', '')
            if (bandera === 1) {
                this.setState({ data: secciones.sections, nombreModulo: secciones.name, descripcion: secciones.description, idModulo: secciones.id })
            }
            if (bandera === 2) {
                AsyncStorage.getItem('token').then(
                    (res) => {
                        let config = { headers: { Authorization: 'Bearer ' + res } }
                        consultarSecciones(config).then(
                            res => {
                                let arraysecciones = []
                                for (var i = 0, max = res.data.length; i < max; i += 1) {
                                    if (res.data[i].module_id === secciones.id) {
                                        let seccion = {
                                            id: res.data[i].id,
                                            module_id: res.data[i].module_id,
                                            name: res.data[i].name
                                        }
                                        arraysecciones.push(seccion);
                                    }       
                                }
                                this.setState({ data: arraysecciones, nombreModulo: secciones.name, descripcion: secciones.description, idModulo: secciones.id })
                            }).catch(
                                erro => {
                                    alert(JSON.stringify(erro))
                                })
                    }).catch(
                        (erro) => {
                            alert('error asyn')
                        })
                
            }

        })

    }

    crearSeccion = () => {
        this.props.navigation.navigate('crearSeccion', { idModulo: this.state.idModulo })
     }

    editarNombre = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    editarSeccion = (idseccion) =>{
        this.props.navigation.navigate('editarSeccion', { idSeccion: idseccion, idModulo: this.state.idModulo })
    }

    crearQuiz =()=>{
        this.props.navigation.navigate('crearQuiz', { idModulo: this.state.idModulo, idQuiz: 2 })
    }


    renderItem = ({ item, index, move, moveEnd }) => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#E8E8EC',
                    paddingHorizontal: 12,
                    marginBottom: 5,
                    marginTop: 10,
                    borderRadius: 5,
                    height: 50,
                    alignItems: 'center'
                }}
                onLongPress={move}
                onPressOut={moveEnd}
                onPress = {() => this.editarSeccion(item.id)}
            >
                <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 15, }}>{item.name}</Text>
                <Icon name='pencil' color='#ff5a06' type='font-awesome' />
            </TouchableOpacity>
        )
    }




    render() {
        return (
            <View style={{ flex: 1, margin: '8%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={this.editarNombre} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Editar Modulo </Text>
                        <Text style={{ color: '#D2D2D3' }} >{this.state.nombreModulo} </Text>
                        <Text style={{ color: '#D2D2D3' }} >{this.state.descripcion}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name='trash' color='red' type='font-awesome' />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '3%' }}>
                    <TouchableOpacity style={styles.bcrearNuevaSeccion} onPress={this.crearSeccion}>
                        <Text style={{ color: 'white' }}>Crea nueva seccion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bcrearQuiz} onPress={()=>{this.crearQuiz()}} >
                        <Text style={{ color: 'white' }}>Crear Quiz</Text>
                    </TouchableOpacity>
                </View>

                <DraggableFlatList
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => {
                        this.setState({ data: data })
                        //this.enviar(data)
                    }
                    }
                />
                <View>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 15, }}>
                            <Text>Nombre Modulo</Text>
                            <TextInput style={styles.textInput}
                             onChangeText={nm => this.setState({ nombreModulo: nm })} 
                             value={this.state.nombreModulo} />
                            <Text>Descripcion</Text>
                            <TextInput style={styles.textInput}
                                multiline={true}
                                numberOfLines={3} 
                                onChangeText={des => this.setState({ descripcion: des })}
                                value={this.state.descripcion}/>
                            <Button title="Guardar Modulo" color='#ff5a06' onPress={this.editarNombre} />
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }


    componentWillUnmount() {
        this.pantallaEditarModuloEntrada.remove();
    }

}

export default nosotros;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%'
    },
    bcrearNuevaSeccion: {
        justifyContent: 'space-between',
        backgroundColor: '#ff5a06',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginRight: 5
    },
    bcrearQuiz: {
        justifyContent: 'space-between',
        backgroundColor: '#525252',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 18,
        marginRight: 5
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },
});
