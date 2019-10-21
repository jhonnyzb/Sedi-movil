import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Image, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

//rutas
import Login from './screens/general/containers/login.js';
import inicioUsuario from './screens/usuario/containers/inicioUsuario';
import inicioSuperAdmin from './screens/superAdmin/containers/inicioSuperAdmin';
import crudUsuarios from './screens/superAdmin/containers/crudUsuarios';
import crudClientes from './screens/superAdmin/containers/crudClientes';
import crudLicencias from './screens/superAdmin/containers/crudLicencias';
import crudCursos from './screens/superAdmin/containers/crudCursos';
import crearUsuarios from './screens/superAdmin/containers/crearUsuario';
import editarCursos from './screens/superAdmin/containers/editarCurso';
import editarModulos from './screens/superAdmin/containers/editarModulo';
import editarClientes from './screens/superAdmin/containers/editarCliente';
import crearModulos from './screens/superAdmin/containers/crearModulo'
import crearClientes from './screens/superAdmin/containers/crearCliente';
import crearLicencias from './screens/superAdmin/containers/crearLicencia';
import crearCursos from './screens/superAdmin/containers/crearCurso';
import crearSeccion from './screens/superAdmin/containers/crearSeccion';
import crearQuiz from './screens/superAdmin/containers/crearQuiz'
import preguntasRespuestas from './screens/superAdmin/containers/preguntasRespuestas';
import cuestionarioDetalles from './screens/superAdmin/containers/cuestionarioDetail';
import editarSeccion from './screens/superAdmin/containers/editarSeccion';
import inicioAdmin from './screens/admin/containers/inicioAdmin';
import busquedaCursosUsuario from './screens/usuario/containers/busquedaCursosUsuario'


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

            <TouchableOpacity onPress={() => alert('This is a button!')} style={styles.btnBarra}>
                <Text style={styles.texto} >@Usuario{"\n"}3000pts</Text>
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
    crudUsuarios: {
        screen: crudUsuarios,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crudClientes: {
        screen: crudClientes,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crudLicencias: {
        screen: crudLicencias,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crudCursos: {
        screen: crudCursos,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },

    crearUsuarios: {
        screen: crearUsuarios,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearClientes: {
        screen: crearClientes,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    editarClientes: {
        screen: editarClientes,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearLicencias: {
        screen: crearLicencias,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearCursos: {
        screen: crearCursos,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    editarCursos: {
        screen: editarCursos,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    editarModulos: {
        screen: editarModulos,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearModulos: {
        screen: crearModulos,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearSeccion: {
        screen: crearSeccion,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    editarSeccion: {
        screen: editarSeccion,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    crearQuiz: {
        screen: crearQuiz,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    preguntasRespuestas: {
        screen: preguntasRespuestas,
        navigationOptions: {
            headerTitle: <LogoTitle />,
            headerStyle: {
                backgroundColor: '#343434'
            },
            headerTintColor: '#ff5a06',
            headerRight: <BotonBarra />
        }
    },
    cuestionarioDetalles: {
        screen: cuestionarioDetalles,
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
    btnBarra: {
        flex: 1,
        marginTop: 12,
        flexDirection: 'row'
    },
    texto: {
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
        marginLeft: 3
    }


})