import React from 'react';
import {View} from "../components/Themed";
import AchievementItem from "../components/Achievements/AchievementItem";
import {Achievements} from "../models/Profile.model";
import {getMaxValue} from "../utils/achievement.util";
import {StyleSheet} from "react-native";
import Spacing from "../constants/Spacing";

const mock: Achievements = {
    books: {
        level: 3,
        value: 5
    },
    friends: {
        level: 0,
        value: 0
    },
    pages: {
        level: 4,
        value: 199
    },
    score: {
        level: 10,
        value: 50
    },
    streak: {
        level: 5,
        value: 65
    },
}

const AchievementsScreen = () => {
    return (
        <View style={s.container}>
            <AchievementItem
                level={mock.books.level}
                image={`books/books${mock.books.level}`}
                title={'Książnik'}
                description={'Przeczytaj daną ilość książek'}
                currentValue={mock.books.value}
                maxValue={getMaxValue('books', mock.books.level)}/>
            <AchievementItem
                level={mock.friends.level}
                image={`friends/friends${mock.friends.level}`}
                title={'Koleszka'}
                description={'Dodaj nowych znajomych'}
                currentValue={mock.friends.value}
                maxValue={getMaxValue('friends', mock.friends.level)}/>
            <AchievementItem
                level={mock.pages.level}
                image={`pages/pages${mock.pages.level}`}
                title={'Stronny'}
                description={'Przeczytaj daną ilość stron'}
                currentValue={mock.pages.value}
                maxValue={getMaxValue('pages', mock.pages.level)}/>
            <AchievementItem
                level={mock.score.level}
                image={`score/score${mock.score.level}`}
                title={'Krytyk'}
                description={'Oceń książki'}
                currentValue={mock.score.value}
                maxValue={getMaxValue('score', mock.score.level)}/>
            <AchievementItem
                level={mock.streak.level}
                image={`streak/streak${mock.streak.level}`}
                title={'Silna wola'}
                description={'Utrzymuj codzienną passę'}
                currentValue={mock.streak.value}
                maxValue={getMaxValue('streak', mock.streak.level)}/>
        </View>
    );
};
const s = StyleSheet.create({
    container: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop:Spacing.md,
    }
})
export default AchievementsScreen;
