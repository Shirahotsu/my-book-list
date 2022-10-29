import React from 'react';
import {Text, View} from "../Themed";
import ProgressBar from "./ProgressBar";
import {Image, StyleSheet, useColorScheme} from "react-native";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface Props {
    image: string
    level: number,
    title: string,
    description: string,
    maxValue: number
    currentValue: number
}

const AchievementItem = (props: Props) => {
    const colorScheme = useColorScheme();
    return (
        <View style={s.mainContainer}>
            <View style={s.imageContainer}>
                {
                    props.level > 0
                        ? <Image style={s.image} source={require(`../../assets/achievements/${props.image}.png`)}/>
                        : <View style={s.iconView}>
                            <FontAwesome5 size={64} name={'question'}
                                          color={Colors[colorScheme].text}/>
                        </View>
                }

            </View>
            <View style={s.infoContainer}>
                <View style={s.textContainer}>
                    <View style={s.titleContainer}>
                        <Text style={s.title}>
                            {props.title}
                        </Text>
                        <Text style={s.level}>
                            lv. {props.level}
                        </Text>
                    </View>

                    <Text style={s.description}>
                        {props.description}
                    </Text>
                </View>
                <View style={s.progressBarContainer}>
                    <View style={s.progressBar}>
                        <ProgressBar maxValue={props.maxValue} currentValue={props.currentValue}/>
                    </View>
                    <View style={s.progressBarInfo}>
                        <Text>{props.currentValue} / </Text>
                        <Text>{props.maxValue}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
const s = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        flex: 1,
        flexWrap: "nowrap",
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        height: 80
    },
    imageContainer: {
        height: 80,
        width: 80
    },
    iconView: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    infoContainer: {
        flexDirection: 'column',
        flex: 1,
        paddingLeft: Spacing.sm,
        justifyContent: 'space-between',
        height: 80
    },
    textContainer: {},
    titleContainer: {
        flexDirection: 'row',
    },
    title: {
        fontSize: FontSize.h3,
        fontWeight: "bold",
        textTransform: 'uppercase',
        marginRight: Spacing.xs
    },
    level: {
        fontSize: FontSize.h3,
        fontWeight: "bold",
    },
    description: {},
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressBar: {
        flex: 1,
        marginRight: Spacing.xs
    },
    progressBarInfo: {
        maxWidth: 100,
        minWidth: 60,
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
})

export default AchievementItem;
