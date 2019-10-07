import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native'


export default class inicioUsuario extends Component {
    

    render() {
        return (
            <ScrollView>
                <View>
                    <ImageBackground source={require('../../../assets/img/fondoUsuario1.jpg')} style={{ width: null, height: '100%', flex: 1 }} >
                        <Text>inicioSuperAdmin</Text>
                    </ImageBackground>
                    <Text>hola</Text>

                </View>
            </ScrollView>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }

})