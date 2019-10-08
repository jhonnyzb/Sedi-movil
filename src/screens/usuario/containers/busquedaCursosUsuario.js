import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Item, Input, Icon } from 'native-base';
import { consultaCursosUsuario } from '../../../servicios/usuario/consultaCursosUsuario';
import TextoCurso from '../componentes/textoCursos'

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
                <View style={{ width: width / 2.3, height: 100, backgroundColor: '#ff5a06', justifyContent: 'center', margin: 1, borderRadius: 10 }} >
                    <Text style={{ fontSize: 22, textAlign: 'center', color: '#fff' }}> {first_name} </Text>
                </View>

        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'  }}>
                    <ActivityIndicator />
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <TextoCurso />
                <Item regular style={styles.input}>
                    <Icon active name='ios-search' style={styles.icon} />
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
        paddingTop: 20,
        paddingStart: 20,
        paddingEnd: 20
    },
    input: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10

    },
    icon: {
        color: '#ff5a06',
        fontWeight: 'bold'
    },
    

});