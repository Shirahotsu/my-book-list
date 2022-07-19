import {ScrollView, StyleSheet} from 'react-native';

import { Text, View } from '../components/Themed';
import BasicInfo from "../components/Profile/BasicInfo";
import Spacing from "../constants/Spacing";
import PagesRead from "../components/Profile/PagesRead";

export default function Profile() {
  return (
    <ScrollView style={s.container}>
      <View style={s.basicInfo}>
        <BasicInfo />
        <PagesRead/>
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
  }
});
