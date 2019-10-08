import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Item, Input, Button } from 'native-base';
import { Icon } from 'react-native-elements'
import { consultaCursosUsuario } from '../../../servicios/serviciosUsuario/consultaCursosUsuario';
import TextoCurso from '../componentes/textoCursos'
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, data: "" }
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

    cursosVista(item) {
        const { id, first_name, last_name, email, avatar } = item.item;
        return (
            <View style={styles.vistaCursosContainer} >
                <View style={styles.vistaCursos}>
                    <View style={styles.iconoCurso}>
                        <Icon
                            name='logo-nodejs'
                            type='ionicon'
                            color='#ff5a06'
                            size={45}
                        />
                    </View>
                </View>
                <View style={styles.textocursoI}>
                    <Text>Diseño Arquitectura y desarrollo</Text>
                    <TouchableOpacity onPress={() => alert('This is a button!')}>
                        <Text style={{ paddingHorizontal: 12, borderRadius: 5, paddingVertical: 6, marginTop: 8, backgroundColor: '#ff5a06', color: 'white', borderColor: '#ff5a06' }}>Ver mas</Text>
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
                <TextoCurso />
                <Item regular style={styles.input}>
                    <Icon name='search' color='#ff5a06' type='font-awesone' size={30} />
                    <Input placeholder='Busca un curso a tu medida' placeholderTextColor='#CFCFCF' />
                </Item>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.cursosVista.bind(this)}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingStart: 20,
        paddingEnd: 20
    },
    input: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10

    },
    vistaCursosContainer: {
        flexDirection: 'row',

    },
    vistaCursos: {
        width: 70,
        height: 70,
        backgroundColor: '#ff5a06',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 25
    },
    iconoCurso: {
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    textocursoI: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }


});