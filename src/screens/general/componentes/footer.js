import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'


function footer (props) {

    return (
        <View style={styles.contenedorPie}>
            <Text style={styles.textoPie} >
                Lorem ipsum dolor sit amet consectetur adipiscing elit cubilia vivamus inceptos a, fermentum leo aliquet blandit mus suscipit semper cursus maecenas varius eu dis
        </Text>
            <View style={{ flexDirection: 'row' }}>
                <Icon name='facebook-official' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                <Icon name='instagram' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
                <Icon name='twitter' type='font-awesome' color='#fff' size={20} containerStyle={{ marginHorizontal: 14 }} />
            </View>
            <View style={{ flexDirection: 'row', marginBottom: '5%', marginTop: '5%' }}>
                <Text style={styles.textoPoliticas}>Politicas de privacidad |</Text>
                <Text style={styles.textoPoliticas} >| Terminos y condiciones</Text>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    contenedorPie: {
        backgroundColor: '#343434',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    textoPie: {
        color: 'white',
        textAlign: 'center',
        marginBottom: '5%'
    },
    textoPoliticas: {
        color: 'white',
        fontSize: 10,
        padding: '2%'
    },

})
export default footer