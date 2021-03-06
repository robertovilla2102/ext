import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
//import { useNavigation } from "@react-navigation/native"
import styled from "styled-components/native";
import { Rating } from 'react-native-ratings';
import Boton from './../ui/Button'
import Carousel from "../components/Carousel";
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";
import { fetchFavs, deleteFav, deleteFavs, fetchFav } from "../../redux/actions/user"
import { connect } from "react-redux";
import Axios from "axios";



function Favorites({ user,fetchFavs, deleteFavs, deleteFav, state, navigation }) {
  //const navigation = useNavigation();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    deleteFavs()
    fetchFav(user.uid)
      .then((res) => {
        fetchFavs(res.data.favoritos)
        .then(()=>{
          setTimeout(function(){ setLoading(false); }, 1500)
          })
      })
  }, [])

  function delFav(id, userId) { 
    setLoading(true)
    let newFavs =  state.user.favorites.filter(fav => fav.id !== id)
    deleteFavs()
    deleteFav(newFavs, id, userId)
    setTimeout(function(){ setLoading(false); }, 2000)
   
  }

  function sendId(id) {
    return navigation.navigate(`SingleView`, { propertyId: id })
  }

  return (
    
    <ScrollView>
      {!loading && state.user.favorites.length ? (
        
        !loading ?
          <Wrapper>
            {state.user.favorites.map((espacio, index) => {
              return (
                <FadeInView key={index} order={index}>
                  <StyledView

                    style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
                  >
                    <View>
                      <View style={{
                        width: '100%',
                        height: (espacio.photos || []).length ? 250 : "auto",
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        overflow: "hidden"
                      }} >
                        <Carousel images={espacio.photos || []} height={250} />
                        {espacio.verified ? (<Verified style={{ position: "absolute", bottom: 5, right: 2, zIndex: 9 }}>
                          <Image source={require("../../public/icons/verificado-ve.png")} style={{ width: 40, height: 40 }} />
                        </Verified>) : null}
                      </View>
                      <ViewInfo>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => { return sendId(espacio.id) }}
                          >
                            <Titulo>{espacio.title}</Titulo>
                            {espacio.province === 'ciudad autónoma de buenos aires'
                              ? <Subtitulo>{`${espacio.neighborhood} - Capital Federal - ${espacio.size}mtr2`}</Subtitulo>
                              : <Subtitulo>{`${espacio.neighborhood} - ${espacio.province} - ${espacio.size}mtr2`}</Subtitulo>
                            }
                            <View style={{ margin: 0, alignItems: "flex-start", marginLeft: 2 }}>
                              <Rating
                                type='custom'
                                ratingBackgroundColor='#c8c7c8'
                                ratingCount={5}
                                imageSize={15}
                              />
                              <TouchableOpacity onPress={() => showComments(espacio.id)}>
                                <Text
                                  style={{ color: "grey", fontWeight: "bold", padding: 10 }}
                                >{`${(espacio.comments || "").length || 0}  Ver comentarios`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity 
                          onPress={() => delFav(espacio.id, user.uid)}>
                            <Image
                              style={{ width: 30, height: 30, marginRight: 2 }}
                              source={(require("../../public/icons/corazon-ro.png"))}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}
                        >
                          <Precio>{`$${espacio.price}`}</Precio>
                          <Text style={{ alignSelf: 'center' }}>por hora</Text>
                        </View>
                        <DoubleWraper>
                          <Boton
                            onPress={() => { return sendId(espacio.id) }}
                            bg="#4A94EA"
                            color="#F7F7F7"
                            mr="5px"
                          >Mas Info.
          </Boton>

                          <Boton
                            onPress={() => Linking.openURL(`tel:${+541123561654}`)}
                            bg="#F77171"
                            color="#F7F7F7"
                            ml="5px"
                          >Contacto.
          </Boton>

                        </DoubleWraper>
                      </ViewInfo>

                    </View>
                  </StyledView>
                </FadeInView>
              );
            })}
          </Wrapper>
          : <Loading />
      ):(
        !loading ? ( <Centered><Tit>Todavia no tenes favoritos!</Tit></Centered>):(<Loading />)
       
      )}
      
    </ScrollView>
  )
}

const StyledView = styled.View`
  margin: 10px 5px;
  background-color: #F7F7F7;
  padding : 0;
  border-radius: 10px;
`
const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
`
const ViewInfo = styled.View`
padding: 18px;
`
const Precio = styled.Text`
  font-size: 20px;
  margin: 3px;
`
const Titulo = styled.Text`
  font-size: 17px;
  text-transform: capitalize;
  margin: 3px 3px 0px 3px;
`
const Subtitulo = styled.Text`
  font-size: 15px;
  font-weight: 100;
  text-transform: capitalize;
  color: grey;
  margin: 0 3px 3px 3px;
`
const Verified = styled.View`
`
const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`
const Centered = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
`
const Tit = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: grey;
  margin-top: 80px;
`
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged,
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchFavs: (favoritos) => (dispatch(fetchFavs(favoritos))),
    deleteFavs: () => (dispatch(deleteFavs())),
    deleteFav: (favorites, id, userId) => (dispatch(deleteFav(favorites, id, userId)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);