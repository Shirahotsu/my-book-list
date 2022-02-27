import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import Spacing from '../constants/Spacing'
import {RootTabScreenProps} from '../types';
import BookItem from "../components/BookItem/BookItem";
import React from 'react';
import BookItemProps from "../models/BookItemProps";

export default function MyList({navigation}: RootTabScreenProps<'MyList'>) {
    return (
        <SafeAreaView style={s.container}>
            <ScrollView style={s.scroll}>
                {
                    data1.map((d,i)=>
                        <View key={i} style={s.item}>
                            <BookItem isFromMyBookList={true} title={d.title} pagesRead={d.pagesRead} maxPages={d.maxPages} score={d.score}/>
                        </View>
                    )
                }

            </ScrollView>
        </SafeAreaView>
    );
}

const data1:BookItemProps[] = [
    {
        title:'Super pierwszy tytuł nwm jaki dokladnaie',
        pagesRead: 12,
        maxPages: 120,
        score: 7
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
