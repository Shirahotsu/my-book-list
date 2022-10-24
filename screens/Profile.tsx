import {Pressable, StyleSheet, TouchableHighlight, TouchableOpacity, useColorScheme} from 'react-native';

import {Button, Text, View, ScrollView} from '../components/Themed';
import BasicInfo from "../components/Profile/BasicInfo";
import Spacing from "../constants/Spacing";
import PagesRead from "../components/Profile/PagesRead";
import {login, register, logOut} from '../firebase/main.firebase'
import {userStore} from "../store/user.store";
import {useToast} from "react-native-toast-notifications";
import {FontAwesome5} from "@expo/vector-icons";
import FontSize from "../constants/FontSize";
import React from "react";
import Colors from "../constants/Colors";
import {RootTabScreenProps} from "../types";

export default function Profile({navigation}: RootTabScreenProps<'Profile'>) {

  const colorScheme = useColorScheme();
  const toast = useToast();

  const handleOnLogOut = async () => {
    const response = await logOut()
    if(response) {
      userStore.removeUser()
      toast.show('Pomyślnie wylogowano', {type:'success'})
    } else {
      toast.show('Błąd z wylogowaniem, spróbuj jeszcze raz', {type:'danger'})
    }
  }

  const navigateTo = (link:string) => {
    navigation.push(link)
  }

  const LinkButton = ({label, link}) => {
    return(
        <TouchableOpacity onPress={()=>navigateTo(link)}>
          <View style={s.linkButtonContainer}>
            <Text style={s.linkButtonText}>{label}</Text>
            <View style={s.iconView}>
              <FontAwesome5 size={FontSize.h5} name={'chevron-right'}
                            color={Colors[colorScheme].text}/>
            </View>
          </View>
        </TouchableOpacity>
    )
  }

  return (
    <ScrollView style={s.container}>
      <View style={s.basicInfo}>
        <BasicInfo />
        <View>
          <LinkButton label={'Przyjaciele'} link={'Friends'}/>
          <View style={s.horizontalBar}/>
          <LinkButton label={'Wykresy'} link={'Friends'}/>
          <View style={s.horizontalBar}/>
          <LinkButton label={'Osiągnięcia'} link={'Friends'}/>
        </View>
        <PagesRead/>
        <View style={s.logOutButton}>
          <Button title={'Wyloguj się'} onPress={() => handleOnLogOut()}/>
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  basicInfo:{
    marginVertical: Spacing.xl
  },
  linkButtonContainer:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  logOutButton:{
    marginTop: Spacing.xl
  },
  linkButtonText:{
    fontSize: FontSize.h5
  },
  iconView:{
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  horizontalBar: {
    width: '100%',
    height: 1,
    backgroundColor: '#cecece'
  }
});
