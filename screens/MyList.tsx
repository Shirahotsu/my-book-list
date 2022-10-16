import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {Text, View} from '../components/Themed';
import Spacing from '../constants/Spacing'
import {RootTabScreenProps} from '../types';
import BookItem from "../components/BookItem/BookItem";
import React, {useEffect} from 'react';
import BookItemProps from "../models/BookItemProps";
import {loadBooksInMyBookshelf} from "../firebase/bookShelf";
import {observer} from "mobx-react";
import {bookDetailsStore} from "../store/bookDetails";
import {bookShelfStore} from "../store/bookShelf";
import {backgroundColor} from "react-native-calendars/src/style";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export default function MyList({navigation}: RootTabScreenProps<'MyList'>) {
    const colorScheme = useColorScheme();

    useEffect(() => {
        loadBooksInMyBookshelf()
    }, [])

    const BookshelfView = observer(() => {
        return (
            <>{
                bookShelfStore.bookShelf.map((book, i) =>
                    <View key={i} style={s.item}>
                        <BookItem isFromMyBookList={true} title={book.title} pagesRead={book.pagesRead} maxPages={0}
                                  score={book.myScore}/>
                    </View>
                )}
            </>
        )
    })

    return (
        <SafeAreaView style={[s.container, {backgroundColor: Colors[colorScheme].background}]}>
            <ScrollView style={s.scroll}>
                <BookshelfView/>
            </ScrollView>
        </SafeAreaView>
    );
}

const data1: BookItemProps[] = [
    {
        title: 'Super pierwszy tytuł nwm jaki dokladnaie',
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
