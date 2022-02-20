import {Image, StyleSheet} from 'react-native';

import Colors from '../constants/Colors';
import { Text, View } from './Themed';

export default function BookItem() {
    return (
        <View style={s.bookItemContainer}>
            <View style={s.bookImageContainer} >
                <Image  style={s.bookImage}  source={require('../assets/images/book-img-1.jpg')}/>
            </View>
            <View style={s.bookInfo} >
                <Text>ESSA</Text>
            </View>
        </View>
    )
}
const s = StyleSheet.create({
    bookItemContainer:{
        flexDirection:'row',
        width: '100%',
        height: '150px'
    },
    bookImageContainer:{
        flex:0.3,
        alignSelf: "flex-end",
        width: '100%',
        height: '100%'
    },
    bookImage:{
        resizeMode:'contain',
        width: '100%',
        height: '100%'
    },
    bookInfo:{
        flex:0.7
    }
})
