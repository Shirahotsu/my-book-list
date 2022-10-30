import {Image, ScrollView, StyleSheet, TextInput, View as ViewRN} from 'react-native';

import {Button, Text, View} from '../components/Themed';

import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import Title from "../components/BookItem/Title";
import useColorScheme from "../hooks/useColorScheme";
import BadgeThemed from "../components/BadgeThemed";
import {observer} from "mobx-react";
import {bookDetailsStore} from "../store/bookDetails.store";
import {convertDateToDashedDate, convertSecondsToDate} from "../utils/date";
import React, {createRef, useEffect, useState} from "react";
import {Book} from "../models/Book.model";
import {addComment} from "../firebase/bookList.firebase";
import {getAverageScore} from "../utils/score";
import {BookStatus} from "../models/BookShelf.model";
import Dropdown from "../components/Dropdown";
import {
    addToBookshelf,
    changeBookPagesRead,
    changeBookScore,
    changeBookStatus,
    removeFromBookshelf
} from '../firebase/bookShelf.firebase'
import {useToast} from "react-native-toast-notifications";
import {profileStore} from "../store/profile.store";
import {loadProfileDetails} from "../firebase/profile.firebase";
import {RootTabScreenProps} from "../types";
import {achievementsStore} from "../store/achievements.store";

const statusOptions = [
    {
        label: 'Do przeczytania',
        value: BookStatus.PlanToRead
    },
    {
        label: 'W trakcie',
        value: BookStatus.Reading
    },
    {
        label: 'Przeczytano',
        value: BookStatus.Completed
    }
]

const scoreOptions = [
    {
        label: '(1) Okropne',
        value: 1
    },
    {
        label: '(2) Bardzo złe',
        value: 2
    },
    {
        label: '(3) Złe',
        value: 3
    },
    {
        label: '(4) Słabe',
        value: 4
    },
    {
        label: '(5) Średnie',
        value: 5
    },
    {
        label: '(6) Może być',
        value: 6
    },
    {
        label: '(7) Dobre',
        value: 7
    },
    {
        label: '(8) Bardzo dobre',
        value: 8
    },
    {
        label: '(9) Super',
        value: 9
    },
    {
        label: '(10) Arcydzieło',
        value: 10
    },
]


export default function BookDetails({navigation}: RootTabScreenProps<'MyBookShelf'>) {
    const colorScheme = useColorScheme();
    const [comment, setComment] = useState('');
    const [bookDetails, setBookDetails] = useState<Book | null>(null)
    const [isInBookshelfView, setIsInBookshelfView] = useState(false)
    const textarea = React.createRef();
    const [myScore, setMyScore] = useState(null)
    const [bookStatus, setBookStatus] = useState(null)
    const [pagesRead, setPagesRead] = useState('0')
    const [isBookInBookshelf, setIsBookInBookshelf] = useState(false)
    const textInput = createRef()
    const toast = useToast();

    useEffect(() => {
        setBookDetails(bookDetailsStore.bookDetails)
        setIsInBookshelfView(bookDetailsStore.isInBookshelfView)
        if (bookDetailsStore.isInBookshelfView) {
            setInitialBookStatus()
            setInitialScore()
            setInitialPagesRead()
        }
        setInitialIsBookInBookshelf()
    }, [])

    const setInitialBookStatus = () => {
        const value = bookDetailsStore.bookDetails?.status
        if (value === undefined) return
        const label = statusOptions.find(v => v.value === value)?.label
        if (!label) return;
        const bookStatus = {label, value}
        setBookStatus(bookStatus)
    }

    const setInitialScore = () => {
        const value = bookDetailsStore.bookDetails?.myScore
        if (value === undefined) return
        const label = scoreOptions.find(v => v.value === value)?.label
        if (!label) return;
        const myScore = {label, value}
        setMyScore(myScore)
    }

    const setInitialPagesRead = () => {
        const value = bookDetailsStore.bookDetails?.pagesRead
        setPagesRead(String(value) ?? '0')
    }

    const setInitialIsBookInBookshelf = async () => {
        const userId = profileStore.profile.userId
        if (!userId) {
            await loadProfileDetails()
        }
        const bookshelfBooksIds = profileStore.bookshelfBooksIds
        const isBookInBookshelf = bookshelfBooksIds.includes(bookDetailsStore.bookDetails?.id) || false
        setIsBookInBookshelf(isBookInBookshelf)
    }

    const handleAddComment = async () => {
        const commentMessage = textarea.current.value
        if (!commentMessage.trim()) {
            return
        }
        const result = await addComment(commentMessage)
        if (result) {
            textarea.current.value = ''
        }
    }

    const handleOnKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleAddComment()
        }
    }

    const handleOnPagesReadInputBlur = async () => {
        const inputPagesRead = parseInt(textInput.current.value)
        if (inputPagesRead >= 0 && inputPagesRead <= bookDetails.pages) {
            const response = await changeBookPagesRead(bookDetails?.id, inputPagesRead)
            if (response) {
                updatePagesReadAchievement(parseInt(pagesRead), inputPagesRead)
                setPagesRead(String(inputPagesRead))
                toast.show('Zmieniono', {type: 'success'})
            } else {
                textInput.current.value = bookDetails?.pagesRead
                toast.show('Wystąpił nieoczekiwany błąd', {type: 'danger'})
            }
        } else {
            textInput.current.value = bookDetails?.pagesRead
            toast.show('Błędne wartości', {type: 'danger'})
        }
    }

    const updatePagesReadAchievement = (currentPagesRead:number, newPagesRead: number) => {
        const diff = newPagesRead - currentPagesRead
        achievementsStore.updateAchievementValue(diff, 'pages')
    }

    const updateBooksReadAchievement = (newStatus: BookStatus) => {
        if(getIsCompletionStatusChanged(newStatus)){
            if(newStatus===BookStatus.Completed){
                achievementsStore.updateAchievementValue(1, 'books')
            } else{
                if(!bookStatus){
                    return
                }
                achievementsStore.updateAchievementValue(-1, 'books')
            }
        }
    }

    const getIsCompletionStatusChanged = (newStatus: BookStatus) => {
        if(!bookStatus){
            return true
        }
        const oldStatus = bookStatus.value
        return oldStatus === BookStatus.Completed ? (newStatus !== oldStatus) : (newStatus === BookStatus.Completed)
    }


    const handleChangeBookStatus = async (option) => {
        updateBooksReadAchievement(option.value)
        setNookNewStatus(option.value)
        changeBookStatus(bookDetails?.id, option.value)
    }

    const setNookNewStatus = (value: BookStatus) => {
        if (value === undefined) return
        const label = statusOptions.find(v => v.value === value)?.label
        if (!label) return;
        const bookStatus = {label, value}
        setBookStatus(bookStatus)
    }

    const handleChangeBookScore = (option) => {
        if(myScore===null){
            achievementsStore.updateAchievementValue(1,'score')
        }
        changeBookScore(bookDetails?.id, option.value)
    }

    const addBookToBookShelf = async () => {
        const result = await addToBookshelf(bookDetails.id)
        if (result){
            setIsBookInBookshelf(true)
            toast.show('Dodano książkę', {type: 'success'})
        }  else {
            toast.show('Wystąpił nieoczekiwany błąd', {type: 'danger'})
        }
    }

    const removeBookFromBookshelf = async () => {
        const result = await removeFromBookshelf(bookDetails.id)
        if (result){
            const pagesReadInt = parseInt(pagesRead) || 0
            const removeBook = !!(bookStatus && bookStatus.value===BookStatus.Completed)
            await achievementsStore.updateAchievementOnBookRemove(!!myScore, removeBook, pagesReadInt)
            navigation.navigate('MyBookShelf')
        }  else {
            toast.show('Wystąpił nieoczekiwany błąd', {type: 'danger'})
        }
    }

    const MainInfoButtons = ({isInBookshelfView}: any) => {
        if (!isInBookshelfView) {
            return (
                <>
                    {isBookInBookshelf
                        ? <Text>Książka znajduję się już na Twojej półce :)</Text>
                        : <Button title={'Dodaj na półkę'} onPress={() => addBookToBookShelf()}/>
                    }
                </>
            )
        } else return (<>
            <Dropdown
                label="Wybierz status"
                selectedOption={bookStatus ?? undefined}
                data={statusOptions}
                onSelect={v => handleChangeBookStatus(v)}
            />

            <Dropdown
                label="Oceń"
                selectedOption={myScore ?? undefined}
                data={scoreOptions.reverse()}
                onSelect={v => handleChangeBookScore(v)}
            />

            <View style={[s.pagesReadView, {backgroundColor: Colors[colorScheme].tint}]}>
                <ViewRN style={{flexDirection: "row"}}>

                    <Text>Strony</Text>
                    <ViewRN style={{justifyContent: 'flex-start', flexDirection: "row", marginLeft: Spacing.xs}}>
                        <TextInput
                            ref={textInput}
                            style={{width: 30, color: Colors[colorScheme].text, borderWidth: 0}}
                            defaultValue={pagesRead}
                            onBlur={() => handleOnPagesReadInputBlur()}
                        />
                        <Text> / {bookDetails?.pages}</Text>
                    </ViewRN>
                </ViewRN>

            </View>
        </>)
    }

    const BookScoreAndPagesView = observer(() => {
        return (
            <View style={s.scoreContainer}>

                <View>
                    <View style={s.numericInfo}>
                        <View style={s.bookIcon}>
                            <FontAwesome5 size={FontSize.h4} name="star" color={Colors[colorScheme].text}/>
                        </View>
                        <Title>{getAverageScore(bookDetailsStore.totalScore, bookDetailsStore.scoreAmount)}</Title>
                    </View>
                    <View style={s.numericInfo}>
                        <View style={s.bookIcon}>
                            <FontAwesome5 size={FontSize.h4} name={'users'}
                                          color={Colors[colorScheme].text}/>
                        </View>
                        <Title>{bookDetailsStore.totalScore}</Title>
                    </View>

                    <View style={s.spacer}/>

                    <View style={s.numericInfo}>
                        <View style={s.bookIcon}>
                            <FontAwesome5 size={FontSize.h4} name={'book-reader'}
                                          color={Colors[colorScheme].text}/>
                        </View>
                        <Title>{bookDetailsStore.bookDetails.usersFinished}</Title>
                    </View>
                </View>
            </View>
        )
    })


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
                            <MainInfoButtons isInBookshelfView={isInBookshelfView}/>
                        </View>
                    </View>

                    <BookScoreAndPagesView/>

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
                    {
                        !bookDetailsStore.isInBookshelfView &&
                        <View>
                            <View>
                                <textarea ref={textarea} onKeyDown={e => handleOnKeydown(e)}
                                          id={'new-comment-textarea'}/>
                                <Button title={'Dodaj'} onPress={() => handleAddComment()}/>
                            </View>
                            <Text style={{fontSize: FontSize.h2}}>Komentarze:</Text>
                            <CommentsView/>
                        </View>
                    }
                    {
                        bookDetailsStore.isInBookshelfView &&
                        <View>
                            <Button title={'Usuń z półki'} onPress={() => removeBookFromBookshelf()}/>
                        </View>
                    }

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
    },
    buttonsView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: Spacing.md
    },
    optionsView: {
        flexDirection: 'column',
    },
    option: {
        width: '100%',
        paddingVertical: Spacing.sm
    },
    pagesReadView: {
        width: '100%',
        fontWeight: '500',
        textTransform: 'uppercase',
        height: 35,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    }
});
