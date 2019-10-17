import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


class preguntasRespuestas extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View>
                <View style={styles.contenedor}>
                    <Text>Formula la pregunta</Text>
                    <TextInput style={ styles.textInput } multiline={true}  numberOfLines={2}/>
                </View>
            </View>
        );
    }
}

export default preguntasRespuestas;

const styles = StyleSheet.create({
    contenedor: {
        margin: '5%'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 5,
        borderColor: '#F7F7F7',
        marginBottom: 10
    },


})