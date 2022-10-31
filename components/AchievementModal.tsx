import React from 'react';
import {Button, Text, View} from "./Themed";
import {Image, StyleSheet} from "react-native";
import {achievementsStore} from "../store/achievements.store";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import {AchievementType} from "../models/Achievement.model";

const AchievementModal = () => {

    const closeModal = () => {
      achievementsStore.hideAchievementModal()
    }

    const getAchievementLabel = (type:AchievementType | undefined) =>{
        switch (type){
            case "friends":
                return'KOLESZKA'
            case "books":
                 return'KSIĄŻNIK'
            case "score":
                 return'KRYTYK'
            case "streak":
                 return'SILNA WOLA'
            case "pages":
            default:
                return'STRONNY'
        }
    }

    return (
        <View>
            <View>
                <Text style={s.title}>Gratulacje!</Text>
                <Text style={s.subTitle}>Osiągnąłeś nowy poziom!</Text>
            </View>
            <View style={s.imageContainerWrapper}>
                <View style={s.imageContainer}>
                    <Image
                        style={s.image}
                        source={require(`../assets/achievements/${achievementsStore.newAchievementDialog.type}/${achievementsStore.newAchievementDialog.type}${achievementsStore.newAchievementDialog.level}.png`)}/>
                </View>
            </View>

            <View style={s.descriptionContainer}>
                <Text style={s.descriptionText}>Osiągnąłeś poziom {achievementsStore.newAchievementDialog.level} <br/> w kategorii {getAchievementLabel(achievementsStore.newAchievementDialog.type)}</Text>
                <Text style={s.descriptionSubText}>Tak trzymaj, a niedługo będziesz mistrzem czytelnictwa :D</Text>
            </View>
            <View>
                <Button title={'SUPER!'} onPress={()=>closeModal()}/>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    mainContainer:{

    },
    title:{
        fontSize: FontSize.h1,
        textTransform: 'uppercase',
        marginBottom: Spacing.md,
        textAlign:'center'
    },
    subTitle:{
        fontSize: FontSize.h2,
        textTransform: 'uppercase',
        marginBottom: Spacing.md
    },
    imageContainerWrapper:{
        justifyContent: 'space-around',
        alignItems: "center",
        marginBottom: Spacing.md

    },
    imageContainer:{
        width: 256,
        height: 256,
    },
    image: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%'
    },
    descriptionContainer:{
        marginBottom: Spacing.md
    },
    descriptionText:{
        fontSize:FontSize.h5,
        marginBottom: Spacing.sm
    },
    descriptionSubText:{
        marginBottom: Spacing.sm
    },
    buttonContainer:{}
})

export default AchievementModal;
