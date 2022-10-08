import {ScrollView, StyleSheet, TextInput} from 'react-native';

import {Button, Text, View} from '../components/Themed';
import Spacing from "../constants/Spacing";
import {login, register} from '../firebase/main'
import React, { useState } from 'react';




export default function SignIn({navigation}:any) {

  const [loginParams, setLoginParams] = useState({
    email:'email',
    password: ''
  });

  const onChangeText = value => {
    console.log(value)
  }

  return (
      <View style={s.basicInfo}>
        <Text>SignIn</Text>
        <Button title={'Login'} onPress={()=>navigation.push('Login')}/>
          <TextInput
              onChangeText={onChangeText}
              value={loginParams.email}
          />
      </View>
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
  }
});
