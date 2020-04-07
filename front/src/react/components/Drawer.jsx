import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
//navigation
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView
} from "@react-navigation/drawer";

//Importando views and components
import HomePage from "../containers/HomePage";
import SerchSpace from "../containers/serchSpace";
import RegisterPage from "../containers/RegisterPage";
import PaymentPage from "../containers/PaymentPage";
import SpaceForm from "../containers/SpaceForm";
import OwnerForm from "../containers/OwnerForm";
import SingleViewPage from "../containers/SingleViewPage";
import PreviewSpace from "../containers/PreviewSpace";
import AllSpaces from "../containers/AllSpaces";
import LoginPage from "../containers/LoginPage";
import { View, StyleSheet } from "react-native";
import { Avatar, Title, Caption } from "react-native-paper";
import Camera from "../components/Camera";
import UploadingFiles from "../containers/UploadingFiles";
<<<<<<< HEAD
import Profile from "./Profile";
import CommentsContainer from "../containers/CommentsContainer";
=======
import Profile from './Profile'
import UserProperties from './UserPorperties'
>>>>>>> 9ba8865ae14491a1cee2bd713c55b522a3ab698a

//importando action creator
import { LogoutUser } from "../../redux/actions/user";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoSection}>
        <Avatar.Image
          style={styles.avatarImage}
          source={require("../../public/images/isologotipo-only.png")}
          size={68}
        />
        {props.userInfo.id ? (
          <View>
            <Title style={styles.title}>
              {props.userInfo.firstName} {props.userInfo.lastName}
            </Title>
            <Caption style={styles.caption}>{props.userInfo.email}</Caption>
          </View>
        ) : (
            <View>
              <Title style={styles.title}>Bienvenido!</Title>
              <Caption style={styles.caption}>Disfruta de EXT</Caption>
            </View>
          )}
      </View>

      <DrawerItem
        label="Home"
        onPress={() =>
          props.navigation.navigate("Root", { screen: "Home" }, props)
        }
      />

      {props.userInfo.id ? (
        <View>
          <DrawerItem
            label="Mi Perfil"
            onPress={() =>
              props.navigation.navigate("Root", { screen: "Profile" }, props)
            }
          />

          <DrawerItem
            label="Logout"
            onPress={() =>
              LogoutUser().then(() =>
                props.navigation.navigate("Root", { screen: "Login" })
              )
            }
          />
        </View>
      ) : (
          <View>
            <DrawerItem
              label="Login"
              onPress={() =>
                props.navigation.navigate("Root", { screen: "Login" }, props)
              }
            />

            <DrawerItem
              label="Register"
              onPress={() =>
                props.navigation.navigate("Root", { screen: "Register" }, props)
              }
            />
          </View>
        )}
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1
  },
  userInfoSection: {
    paddingLeft: 25,
    paddingTop: 20
  },
  avatarImage: {
    backgroundColor: "white"
  },
  title: {
    marginTop: 20,
    fontWeight: "bold"
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingBottom: 20
  }
});

function Root() {
  const titulo = (title, backRoute) => ({
    header: props => <Navbar {...props} title={title} backRoute={backRoute} />,
    headerStyle: {
      backgroundColor: "transparent"
    }
  });
  return (
    <Stack.Navigator inicialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SerchSpace"
        component={SerchSpace}
        options={({ header: () => null }, titulo("Busca tu espacio"))}
      />
      <Stack.Screen
        name="Register"
        component={RegisterPage}
        options={({ header: () => null }, titulo("Crea tu cuenta"))}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentPage}
        options={({ header: () => null }, titulo("Elegi tu plan"))}
      />
      <Stack.Screen
        name="SpaceForm"
        component={SpaceForm}
        options={({ header: () => null }, titulo("Encontra tu espacio"))}
      />
      <Stack.Screen
        name="OwnerForm"
        component={OwnerForm}
        options={({ header: () => null }, titulo("Ofrece tu espacio"))}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ header: () => null }, titulo("Mi Perfil"))}
      />
      <Stack.Screen
        name="SingleView"
        component={SingleViewPage}
        options={({ header: () => null }, titulo("Single view"))}
      />
      <Stack.Screen
        name="AllSpaces"
        component={AllSpaces}
        options={({ header: () => null }, titulo("Espacios", "SerchSpace"))}
      />
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="UploadingFiles"
        component={UploadingFiles}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="PreviewSpace"
        component={PreviewSpace}
        options={({ header: () => null }, titulo("Vista previa"))}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsContainer}
        options={{ header: () => null }, titulo("Comments")}
      />
      <Stack.Screen name="UserProperties" component={UserProperties} options={{ header: () => null }, titulo("Mis Propiedades")} />
    </Stack.Navigator>
  );
}

const DrawerComponenet = ({ userInfo, user }) => {
  useEffect(() => { }, [user]);

  return (
    <Drawer.Navigator
      inicialRouteName="Login"
      hideStatusBar="true"
      drawerType="slide"
      drawerStyle={{ width: 200 }}
      drawerContent={props => (
        <CustomDrawerContent {...props} userInfo={userInfo} user={user} />
      )}
    >
      <Drawer.Screen name="Root" component={Root} />
    </Drawer.Navigator>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.profile.userInfo,
    user: state.user.logged
  };
};

export default connect(mapStateToProps, null)(DrawerComponenet);
