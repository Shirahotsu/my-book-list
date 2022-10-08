import {StyleSheet} from 'react-native';

import {Button, Text, View, ScrollView} from '../components/Themed';
import BasicInfo from "../components/Profile/BasicInfo";
import Spacing from "../constants/Spacing";
import PagesRead from "../components/Profile/PagesRead";
import {login, register, logOut} from '../firebase/main'
import {userStore} from "../store/user";
import {useToast} from "react-native-toast-notifications";

export default function Profile() {

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

  return (
    <ScrollView style={s.container}>
      <View style={s.basicInfo}>
        <BasicInfo />
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
  logOutButton:{
    marginTop: Spacing.xl
  }
});
