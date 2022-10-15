import {SafeAreaView, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';

import {Button, Text, View} from '../components/Themed';
import BookItem from "../components/BookItem/BookItem";
import React, {useEffect} from "react";
import Spacing from "../constants/Spacing";
import {loadFirst10Books, loadAdditional10Books} from "../firebase/bookList";
import {bookListStore} from '../store/bookList'
import {observer} from "mobx-react";
import SortOptions from "../components/TopBooks/SortOptions";

const getAverageScore = (totalScore: number, scoreAmount: number) => {
    return parseFloat((totalScore / scoreAmount).toFixed(2))
}

export default function Top({navigation}: any) {

    useEffect(() => {
        loadFirst10Books()
    }, [])


    const handleOnLoadMoreBooks = () => {
        loadAdditional10Books()
    }

    const BookListView = observer(() => {

        return (
            <>
                {
                    bookListStore.bookList?.map((book, i) =>
                        <View key={i} style={s.item}>
                            <TouchableHighlight onPress={() => navigation.push('Details')}>
                                <BookItem isFromMyBookList={false} title={book.title} booksRead={book.usersFinished}
                                          score={getAverageScore(book.totalScore, book.scoreAmount)} number={i + 1}/>
                            </TouchableHighlight>
                        </View>
                    )
                }
                {
                    bookListStore.loadMoreBooks &&
                    <Button title={'Pobierz więcej'} onPress={() => handleOnLoadMoreBooks()}/>
                }

            </>
        )
    })

    return (
        <SafeAreaView style={s.container}>
            <ScrollView style={s.scroll}>
                <SortOptions/>
                <BookListView/>
            </ScrollView>
        </SafeAreaView>
    );
}

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
