import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground } from 'react-native'
import fondo from '../../public/images/imagen_fondo_mobile_az.jpg'
import styled from "styled-components/native"


/* require('../../public/images/imagen_fondo1.jpg') */

const backgroundLogin = ({ Username, Password, onChangePassword, onChangeUser, Onsubmit, navigation }) => {
    return (

        <ImageBackground
            style={styles.fondo}
            source={{ uri: fondo }}
            resizeMode='cover'
        >

            <View style={{ padding: 10, alignItems: "center" }}>
                <Image source={require('../../public/images/isologotipo-az.png')} style={styles.logoTipoExt} />
                <TextoPrincipal>¿Donde nos juntamos?</TextoPrincipal>
                <View style={styles.inputContainer} >
                    <Image source={require("../../public/images/sobre-bl.png")} style={styles.imagenInputs} />
                    <TextInput
                        style={styles.inputText}
                        value={Username}
                        onChangeText={onChangeUser}
                    ></TextInput >

                </View>
                <View style={styles.inputContainer} >
                    <Image source={require("../../public/images/candado-bl.png")} style={styles.imagenInputs} />
                    <TextInput
                        style={styles.inputText}
                        secureTextEntry={true}
                        value={Password}
                        onChangeText={onChangePassword}
                    ></TextInput >

                </View>

                <RememberPassword>¿Olvido su contraseña? </RememberPassword>
                <BotonIngresar title=" Inquilino" onPress={Onsubmit}>Ingresar</BotonIngresar>
                <BotonRegistrarse
                    title="Registrarse"
                    onPress={() => navigation.navigate('Register')}
                >Registrarse
                </BotonRegistrarse>

            </View>


        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    inputText: {
        height: 40,
        width: 250,
        borderColor: "#D9D5C8",
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 40,
        margin: 10,
        display: "flex",
        color: "#F7F7F7"




    },
    imagenInputs: {
        height: 20,
        width: 20,
        position: "absolute",
        left: 20,


    },
    inputContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row"

    },
    logoTipoExt: {
        height: 85,
        width: 200,
        paddingBottom: 50


    }
})


const TextoPrincipal = styled.Text`
    color:#E9E9E9;
    margin: 0 auto;
    paddingBottom:200px;
    paddingTop:30px
    fontSize:25px
    fontFamily: "Georgia, serif"


`



const RememberPassword = styled.Text`
    color:#E9E9E9;
    margin: 0 auto;
    fontSize:15px;

 fontFamily: "Georgia, serif"

`

const BotonIngresar = styled.Text`
color: #262626;
height: 40px;
width: 250px;
borderColor:#262626
;
borderWidth: 1px;
borderRadius: 30px;
paddingTop:10px;
margin:10px auto;
textAlign:center
`

const BotonRegistrarse = styled.Text`
color: #262626;
height: 40px;
width: 250px;
borderColor:#262626
;
borderWidth: 1px;
borderRadius: 30px;
paddingTop:10px;
margin:10px auto;
textAlign:center
`


export default connect(null, null)(backgroundLogin)





/*

<View style={styles.inputText}>
                    <Image source={require("../../public/images/sobre-bl.png")}
                        style={{ height: 20, width: 20, padding: 10 }} />
                    <TextInput style={{ padding: 10, color: "white" }}
                    ></TextInput >

                </View>
*/