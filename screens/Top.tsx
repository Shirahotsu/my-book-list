import {SafeAreaView, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';

import { Text, View } from '../components/Themed';
import BookItem from "../components/BookItem/BookItem";
import React from "react";
import Spacing from "../constants/Spacing";
import BookItemProps from "../models/BookItemProps";

export default function Top({navigation}: any) {
  return (
      <SafeAreaView style={s.container}>
        <ScrollView style={s.scroll}>
          {
            data2.map((d, i)=>
                <View key={i} style={s.item} >
                  <TouchableHighlight onPress={()=>navigation.push('Details')}>
                   <BookItem isFromMyBookList={false} title={d.title} booksRead={d.booksRead} score={d.score} number={d.number}/>
                  </TouchableHighlight>
                </View>
            )
          }

        </ScrollView>
      </SafeAreaView>
  );
}

const data2:BookItemProps[] = [
  {
    title:'Super pierwszy tytuł nwm jaki dokladnaie',
    booksRead: 12345,
    score: 7.32,
    number:1,
  },
  {
    title:'Super pierwszy tytuł nwm jaki dokladnaie',
    booksRead: 12345,
    score: 7.32,
    number:2,
  },
  {
    title:'Super pierwszy tytuł nwm jaki dokladnaie',
    booksRead: 12345,
    score: 7.32,
    number:3,
  }
]

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    marginVertical: Spacing.sm,
  },
});
