import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import styled from "styled-components/native";
import { connect } from 'react-redux';
import Button from "../ui/Button";
import HomeTabBar from "../components/HomeTabBar";
import Navbar from './Navbar';

const backgroundHome = ({ navigation, user }) => {
  return (
    <ImageBackground
      source={require('../../public/images/imagen_fondo1.jpg')}
      style={styles.fondo}
      blurRadius={4}
    >
      <Navbar/>
      <Wrapper>
        <ScrollView>
          <StyledView>
            <StyledTitle>Encontrá tu Espacio</StyledTitle>
            <StyledText>Descubrí espacios para todas tus reuniones laborales, fiestas, presentaciones, eventos y más.</StyledText>
            <Button
              onPress={() => navigation.push("AllSpaces")}
            >Buscar</Button>
          </StyledView>

          <StyledView>
            <StyledTitle>Ofrecé tu Espacio</StyledTitle>
            <StyledText>Ganá dinero ofreciendo tu espacio, local u oficina disponible para que otros puedan disfrutarlo cuando no lo utilices.</StyledText>


            <Button
              onPress={() => navigation.push('OwnerForm')}
              bg="#F77171">Ofrecer
                </Button>


          </StyledView>

          <DoubleWraper>
            <Button
              bg="#F7F7F7"
              color="gray"
              mr="5px"
            >Conocé más
          </Button>

            <Button
              bg="#F7F7F7"
              color="gray"
              ml="5px"
            >Novedades
            </Button>
          </DoubleWraper>

          <View>
            <Button
              bg="#4A94EA"
              color="#F7F7F7"
              mb="3%"
            >Invita amigos y gana!
            </Button>
          </View>
        </ScrollView>
      </Wrapper>
      <HomeTabBar navigation={navigation} />
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  fondo: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})

const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 3% 0px;
`
const Wrapper = styled.View`
flex-direction: row;
  justify-content: space-between;
  margin: 0px 15px;
  max-width: 500px;
  align-self: center;
`
const StyledView = styled.View`
  margin: 10px 0;
  background-color: #F7F7F7;
  padding : 20px 25px 15px;
  border-radius: 5px
`
const StyledTitle = styled.Text`
margin-bottom : 2%;
font-size: 22px;
font-weight: 600;
`
const StyledText = styled.Text`
margin-bottom : 10px;
font-size: 15px ;
color : gray;
`

const View = styled.View`
margin : 2% 0;
`

export default connect(null, null)(backgroundHome)





