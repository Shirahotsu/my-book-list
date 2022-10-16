import {Image, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import {Text, View} from '../Themed';
import Title from './Title'
import Spacing from "../../constants/Spacing";
import {FontAwesome5} from "@expo/vector-icons";
import useColorScheme from "../../hooks/useColorScheme";
import FontSize from "../../constants/FontSize";
import BookItemProps from '../../models/BookItemProps.model'


export default function BookItem(props: BookItemProps) {
    const colorScheme = useColorScheme();
    const bookCover: string = props.bookCover ?? ''
    const isFromMyBookList: boolean = props.isFromMyBookList ?? false
    const score: number | string = props.score ?? '-'
    const pagesRead: number | string = props.pagesRead ?? '0'
    const maxPages: number | string = props.maxPages ?? '0'

    return (
        <View style={s.bookItemContainer}>
            <View style={s.bookImageContainer}>
                <Image style={s.bookImage} source={require('../../assets/images/book-img-1.jpg')}/>
            </View>
            <View style={s.bookInfo}>
                <View>
                    {!isFromMyBookList && <Text style={s.bookNr}>#{props.number}</Text>}
                    <Title numberOfLines={1}>{props.title}</Title>
                </View>
                <View>
                    <View style={s.bookNumberInfo}>
                        <View style={s.bookIcon}>
                            <FontAwesome5 size={FontSize.h4} name="star" color={Colors[colorScheme].text}/>
                        </View>
                        <Title>{score}</Title>
                    </View>
                    <View style={s.bookNumberInfo}>
                        <View style={s.bookIcon}>
                            <FontAwesome5 size={FontSize.h4} name={isFromMyBookList ? 'check-circle' : 'book-reader'}
                                          color={Colors[colorScheme].text}/>
                        </View>
                        <Title>{isFromMyBookList ? `${pagesRead}/${maxPages}` : props.booksRead}</Title>
                    </View>
                </View>
            </View>
        </View>
    )
}
const s = StyleSheet.create({
    bookItemContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '150px',
    },
    bookImageContainer: {
        flex: 0.3,
        alignSelf: "flex-end",
        width: '100%',
        height: '100%'
    },
    bookImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    bookInfo: {
        paddingVertical: Spacing.xs,
        paddingHorizontal: Spacing.sm,
        flex: 0.7,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    bookNr: {
        fontSize: FontSize.h1,
        marginBottom: Spacing.xs,
        fontWeight: 'bold'
    },
    bookNumberInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bookIcon: {
        marginRight: Spacing.xs
    }
})
