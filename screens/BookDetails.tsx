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

function MainInfoButtons ({isInMyList, myScore, pagesRead}:any) {
    if(isInMyList) {
        return <Button title={'ADD TO MY LIST'} onPress={()=>console.log('%c ES', 'color:fuchsia')}/>
    } else return (<>
        <Button title={'READING'} onPress={()=>console.log('%c ES', 'color:fuchsia')}/>
        <Button title={'MY SCORE: '+ myScore} onPress={()=>console.log('%c ES', 'color:fuchsia')}/>
        <Button title={'PAGES READ: '+ pagesRead} onPress={()=>console.log('%c ES', 'color:fuchsia')}/>
    </>)
}

export default function BookDetails() {
    const colorScheme = useColorScheme();
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
    
    return (
        <ScrollView>
            <View style={s.container}>
                <View>
                    <Text numberOfLines={1} style={s.title}>
                        {details.title}
                    </Text>
                </View>

                <View style={s.mainInfo}>
                    <View style={s.mainInfoImageContainer}>
                        <Image style={s.mainInfoImage} source={require('../assets/images/book-img-1.jpg')}/>
                    </View>
                    <View style={s.mainInfoContent}>
                        {MainInfoButtons(details)}
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
                            <Title>{details.usersScore.users}</Title>
                        </View>

                        <View style={s.spacer}/>

                        <View style={s.numericInfo}>
                            <View style={s.bookIcon}>
                                <FontAwesome5 size={FontSize.h4} name={'book-reader'}
                                              color={Colors[colorScheme].text}/>
                            </View>
                            <Title>{details.booksRead}</Title>
                        </View>
                    </View>
                </View>

                <View style={s.releasedDateContainer}>
                    <Text>
                        Release date:
                        {JSON.stringify(details.releaseDate)}
                    </Text>
                </View>

                <View style={s.categoryContainer}>
                    {
                       details.categories.map((category, i)=><BadgeThemed style={s.categoryBadge} key={i} value={category}/>)
                    }

                </View>

                <View style={s.descriptionContainer}>
                    <Text>
                        {details.description}
                    </Text>
                </View>
            </View>
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
        paddingVertical:Spacing.xs
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingVertical: Spacing.xs
    },
    categoryBadge:{
        marginRight: Spacing.xs
    },
    descriptionContainer: {
        marginVertical: Spacing.xs
    },
    spacer:{
      paddingVertical: Spacing.xs
    }
});
