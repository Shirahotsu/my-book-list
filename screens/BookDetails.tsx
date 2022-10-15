import {Image, Platform, ScrollView, StyleSheet} from 'react-native';

import {Button, Text, View} from '../components/Themed';

import BookDetailsInterface from "../models/BookDetails";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Title from "../components/BookItem/Title";
import useColorScheme from "../hooks/useColorScheme";
import BadgeThemed from "../components/BadgeThemed";
import {observer} from "mobx-react";
import {bookDetailsStore} from "../store/bookDetails";
import {convertDateToDashedDate, convertSecondsToDate} from "../utils/date";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Book} from "../models/Book";
import {addComment} from "../firebase/bookList";

const bookDetailsMock: BookDetailsInterface = {
    isInMyList: false,
    title: 'Harry potter',
    imgUrl: '',
    myScore: 9,
    pagesRead: 234,
    releaseDate: new Date(),
    categories: ['Fantasy', 'Novel', 'Adventure'],
    description: 'Harry jest jedyną osobą, której udaje się przeżyć spotkanie ze złym czarnoksiężnikiem - Lordem Voldemortem. W zdarzeniu jednak giną jego rodzice. Osierocony trafia pod opiekę ciotki Petunii i wuja Vernona. Podczas swoich 11 urodzin dowiaduje się, że odziedziczył po rodzicach magiczne zdolności. Wkrótce trafia do szkoły dla czarodziejów',
    booksRead: 1890325,
    usersScore: {
        users: 280334,
        score: 8.34
    }
}

function MainInfoButtons({isInBookshelfView, myScore, pagesRead}: any) {
    if (!isInBookshelfView) {
        return <Button title={'ADD TO MY LIST'} onPress={() => console.log('%c ES', 'color:fuchsia')}/>
    } else return (<>
        <Button title={'READING'} onPress={() => console.log('%c ES', 'color:fuchsia')}/>
        <Button title={'MY SCORE: ' + myScore} onPress={() => console.log('%c ES', 'color:fuchsia')}/>
        <Button title={'PAGES READ: ' + pagesRead} onPress={() => console.log('%c ES', 'color:fuchsia')}/>
    </>)
}

export default function BookDetails() {
    const colorScheme = useColorScheme();
    const [comment, setComment] = useState('');
    const [bookDetails, setBookDetails] = useState<Book | null>(null)
    const [isInBookshelfView, setIsInBookshelfView] = useState(false)
    const textarea = React.createRef();

    useEffect(() => {
        setBookDetails(bookDetailsStore.bookDetails)
        setIsInBookshelfView(bookDetailsStore.isInBookshelfView)
    }, [])

    const handleAddComment = async () => {
        const commentMessage = textarea.current.value
        if(!commentMessage.trim()){
            return
        }
        const result = await addComment(commentMessage)
        if (result){
            textarea.current.value = ''
        }
    }

    const handleOnKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddComment()
        }
    }


    const details = {
        isInMyList: bookDetailsMock.isInMyList ?? false,
        title: bookDetailsMock.title ?? '',
        imgUrl: bookDetailsMock.imgUrl ?? '',
        myScore: bookDetailsMock.myScore ?? 0,
        pagesRead: bookDetailsMock.pagesRead ?? 0,
        releaseDate: bookDetailsMock.releaseDate ?? '',
        categories: bookDetailsMock.categories ?? [],
        description: bookDetailsMock.description ?? '',
        booksRead: bookDetailsMock.booksRead ?? '',
        usersScore: {
            users: bookDetailsMock.usersScore?.users ?? 0,
            score: bookDetailsMock.usersScore?.score ?? 0
        }
    }

    const BookDetailsView = () => {
        return (bookDetails &&
            <>
                <View style={s.container}>
                    <View>
                        <Text numberOfLines={1} style={s.title}>
                            {bookDetails.title}
                        </Text>
                    </View>

                    <View style={s.mainInfo}>
                        <View style={s.mainInfoImageContainer}>
                            <Image style={s.mainInfoImage} source={require('../assets/images/book-img-1.jpg')}/>
                        </View>
                        <View style={s.mainInfoContent}>
                            {MainInfoButtons({isInBookshelfView})}
                        </View>
                    </View>

                    <View style={s.scoreContainer}>

                        <View>
                            <View style={s.numericInfo}>
                                <View style={s.bookIcon}>
                                    <FontAwesome5 size={FontSize.h4} name="star" color={Colors[colorScheme].text}/>
                                </View>
                                <Title>{details.usersScore.score}</Title>
                            </View>
                            <View style={s.numericInfo}>
                                <View style={s.bookIcon}>
                                    <FontAwesome5 size={FontSize.h4} name={'users'}
                                                  color={Colors[colorScheme].text}/>
                                </View>
                                <Title>{bookDetails.scoreAmount}</Title>
                            </View>

                            <View style={s.spacer}/>

                            <View style={s.numericInfo}>
                                <View style={s.bookIcon}>
                                    <FontAwesome5 size={FontSize.h4} name={'book-reader'}
                                                  color={Colors[colorScheme].text}/>
                                </View>
                                <Title>{bookDetails.usersFinished}</Title>
                            </View>
                        </View>
                    </View>

                    <View style={s.releasedDateContainer}>

                        <Text style={{marginRight: Spacing.xs}}>
                            Data wydania:
                        </Text>
                        <Text>
                            {convertDateToDashedDate(convertSecondsToDate(bookDetails.released.seconds))}
                        </Text>
                    </View>

                    <View style={s.categoryContainer}>
                        {
                            bookDetails.categories.map((category, i) => <BadgeThemed
                                style={s.categoryBadge}
                                key={i}
                                value={category}/>)
                        }

                    </View>

                    <View style={s.descriptionContainer}>
                        <Text style={{fontSize: FontSize.h3}}>
                            Opis:
                        </Text>
                        <Text>
                            {bookDetails.description}
                        </Text>
                    </View>
                    <View>
                        <View>
                            <textarea ref={textarea} onKeyDown={e => handleOnKeydown(e)} id={'new-comment-textarea'}/>
                            <Button title={'Dodaj'} onPress={() => handleAddComment()}/>
                        </View>
                        <Text style={{fontSize: FontSize.h2}}>Komentarze:</Text>
                        <CommentsView/>
                    </View>
                </View>
            </>
        )
    }

    const CommentsView = observer(() => {
        return (bookDetailsStore.bookDetails &&
            <View style={{paddingTop: Spacing.xs, paddingHorizontal: Spacing.xs}}>
                {bookDetailsStore.bookDetails.comments.map((comment, i) => {
                    return (
                        <View key={i} style={{marginVertical: Spacing.sm}}>
                            <View style={{flexDirection: "row", alignItems: 'baseline', flexWrap: 'wrap'}}>
                                <Text style={{fontWeight: 'bold'}}>{comment.userName}</Text>
                                <Text style={{
                                    fontSize: FontSize.basic * 0.7,
                                    opacity: 0.8
                                }}> {convertDateToDashedDate(convertSecondsToDate(comment.released.seconds))}</Text>

                            </View>
                            <Text style={{marginLeft: Spacing.xs}}>{comment.comment}</Text>
                        </View>
                    )

                }).reverse()
                }
            </View>
        )
    })

    return (
        <ScrollView>
            <BookDetailsView/>
        </ScrollView>
    );
}

const s = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.md,
        paddingBottom: Spacing.md,
        minHeight: 'calc(100vh - 113px)'
    },
    title: {
        fontSize: FontSize.h1,
        paddingTop: Spacing.xs
    },
    mainInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '150px',
        marginVertical: Spacing.md
    },
    mainInfoImageContainer: {
        flex: 0.3,
        alignSelf: "flex-end",
        width: '100%',
        height: '100%'
    },
    mainInfoImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    mainInfoContent: {
        paddingLeft: Spacing.xs,
        flex: 0.7,
        alignItems: 'stretch',
        justifyContent: 'space-between'
    },
    scoreContainer: {
        paddingVertical: Spacing.sm
    },
    numericInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookIcon: {
        marginRight: Spacing.xs
    },
    releasedDateContainer: {
        paddingVertical: Spacing.xs,
        flexDirection: 'row',
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingTop: Spacing.xs
    },
    categoryBadge: {
        marginRight: Spacing.xs
    },
    descriptionContainer: {
        marginVertical: Spacing.xl
    },
    spacer: {
        paddingVertical: Spacing.xs
    }
});
