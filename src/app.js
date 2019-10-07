import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/general/containers/login.js';
import inicioUsuario from './screens/usuario/containers/inicioUsuario';
import inicioSuperAdmin from './screens/superAdmin/containers/inicioSuperAdmin';
import inicioAdmin from './screens/admin/containers/inicioAdmin';
import busquedaCursosUsuario from './screens/usuario/containers/busquedaCursosUsuario'
import { Image,Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('./assets/img/logo.png')}
                style={styles.logoBarra}
            />
        );
    }
}

class BotonBarra extends React.Component {
    render() {
        return (
            
            <TouchableOpacity onPress={() => alert('This is a button!')} style = {styles.btnBarra}>
                <Text  style={styles.texto} >@Usuario{"\n"}3000pts</Text> 
                <Image
                    source={require('./assets/img/usuario.png')}
                    style={styles.imgUsuario}
                />
            </TouchableOpacity>
        );
    }
}


const Navegacion = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    inicioUsuario: {
        screen: inicioUsuario,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />

        },
    },
    
    busquedaCursosUsuario: {
        screen: busquedaCursosUsuario,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />

        },
    },
    inicioSuperAdmin: {
        screen: inicioSuperAdmin,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    inicioAdmin: {
        screen: inicioAdmin,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    }
});

export default createAppContainer(Navegacion)

const styles = StyleSheet.create({
    logoBarra: {
        width: '42%',
        height: '60%',
        marginLeft: '25%'
    },
    btnBarra :{
        flex: 1,
        marginTop: 12,
        flexDirection: 'row'
    },
    texto:{
        fontSize: 10,
        color: '#ffff'
    },
    imgUsuario: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: '#ff5a06',
        borderWidth: 1, 
        marginRight: 10, 
        marginLeft:3
    }

    
})