import {Image, StyleSheet} from 'react-native';

import {Text, View} from '../Themed';
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";

export default function BasicInfo() {
    return (
        <View style={s.container}>
            <View style={s.avatarContainer}>
                <Image style={s.avatarImage} source={require('../../assets/images/avatar.jpg')}/>
            </View>
            <View style={s.infoContainer}>
                <Text style={s.infoText}>SuperCzytelnik123</Text>
                <Text style={s.infoText}>Lvl. 23</Text>
                <Text style={s.infoText}>Dni pod rząd: 74</Text>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    avatarContainer: {
        alignSelf: "flex-end",
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: 100
    },
    avatarImage: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    infoContainer: {
        paddingHorizontal: Spacing.lg,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    infoText: {
        fontSize: FontSize.h4
    },
});
