import {Button, Text, View} from "../Themed";
import {FontAwesome5} from "@expo/vector-icons";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import {StyleSheet, TouchableHighlight} from "react-native";
import Spacing from "../../constants/Spacing";
import {useEffect} from "react";
import {bookListStore} from '../../store/bookList'
import {observer} from "mobx-react";

export default function SortOptions(props: any) {
    const colorScheme = useColorScheme();

    useEffect(() => {
        bookListStore.setInitialSortOptionState()
    }, [])

    const handleOnSortByChange = (sortBy: string) => {
        bookListStore.setSortBy(sortBy)
    }

    const handleOnDirectionChange = () => {
        bookListStore.toggleSortDirection()
    }

    const ButtonGroup = observer(() => {
        return (
            <>
                <TouchableHighlight onPress={() => handleOnSortByChange('totalScore')}>
                    <View style={[s.sortByButton, {
                        backgroundColor: bookListStore.sortOption.sortBy === 'totalScore' ? Colors[colorScheme].tint : 'white',
                        borderColor: bookListStore.sortOption.sortBy === 'totalScore' ? Colors[colorScheme].tint : Colors.dark.background,
                        borderBottomLeftRadius: 8,
                        borderTopLeftRadius: 8,
                    }]}>
                        <FontAwesome5 size={FontSize.h3} name={'star'}
                                      color={bookListStore.sortOption.sortBy === 'totalScore' ? 'white' : '#222222'}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => handleOnSortByChange('usersFinished')}>
                    <View style={[s.sortByButton, {
                        backgroundColor: bookListStore.sortOption.sortBy === 'usersFinished' ? Colors[colorScheme].tint : 'white',
                        borderColor: bookListStore.sortOption.sortBy === 'usersFinished' ? Colors[colorScheme].tint : Colors.dark.background,
                        borderBottomRightRadius: 8,
                        borderTopRightRadius: 8,
                    }]}>
                        <FontAwesome5 size={FontSize.h3} name={'book-reader'}
                                      color={bookListStore.sortOption.sortBy === 'usersFinished' ? 'white' : '#222222'}/>
                    </View>
                </TouchableHighlight>
            </>
        )
    })

    const SortDirectionIcon = observer(() => {
        return (
            <View style={s.sortDirectionIcon}>
                <TouchableHighlight onPress={() => handleOnDirectionChange()}>
                    <FontAwesome5 size={FontSize.h3}
                                  name={bookListStore.sortOption.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                                  color={Colors[colorScheme].text}/>
                </TouchableHighlight>
            </View>
        )
    })

    return (
        <View style={s.filtersContainer}>
            <Text style={{marginRight: Spacing.sm}}>Sortuj po:</Text>
            <ButtonGroup/>
            <SortDirectionIcon/>
        </View>
    )
}

const s = StyleSheet.create({
    filtersContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '50px',
        paddingHorizontal: Spacing.sm
    },
    sortByButton: {
        height: '34px',
        width: '40px',
        alignItems: 'center',
        justifyContent: 'space-around',
        border: 'solid 1px',
    },
    sortDirectionIcon: {
        marginLeft: Spacing.md
    }
})
