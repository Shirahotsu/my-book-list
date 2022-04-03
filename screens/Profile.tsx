import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import BasicInfo from "../components/Profile/BasicInfo";
import Spacing from "../constants/Spacing";

export default function Profile() {
  return (
    <View style={s.container}>
      <View style={s.basicInfo}>
        <BasicInfo />
      </View>
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
