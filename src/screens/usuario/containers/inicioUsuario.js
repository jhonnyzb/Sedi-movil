import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { Fab, Icon, Button } from 'native-base';
import  TextoHome from '../componentes/textoHome'



var { height } = Dimensions.get('window');

class inicioUsuario extends Component {

    buscarCursos = () => {
        this.props.navigation.navigate('busquedaCursosUsuario')
    }

    render() {
        return (
            <ScrollView>
                <ImageBackground source={require('../../../assets/img/fondoUsuario1.jpg')} style={styles.imgBackground}>
                    <View style={styles.container}>
                        <TextoHome/>
                        <Button medium light style={styles.botones} >
                            <Text style={styles.text4}>Continua aprendiendo </Text>
                        </Button>
                        <Button medium light onPress={this.buscarCursos} style = {styles.botones}  >
                            <Text style={styles.text4}>Buscar Cursos</Text>
                        </Button>
                        <Fab
                            direction="up"
                            style={styles.colorFab}
                            position="bottomRight"
                            onPress={() => { alert('hola') }} >
                            <Icon name="chatbubbles" style={styles.colorIcon} />
                        </Fab>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingStart: '10%',
        paddingEnd: '5%'
    },
    text4: {
        marginRight: 12,
        marginLeft: 12,
        fontWeight: 'bold'
    },
    imgBackground: {
        width: null,
        height: height,
    },
    botones: {
        marginBottom: 20,
        borderRadius: 8
    },
    colorFab: {
        backgroundColor: '#fff'
    },
    colorIcon: {
        color: '#343434'
    }
})

export default inicioUsuario