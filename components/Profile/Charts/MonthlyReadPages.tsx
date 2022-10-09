import React, {useState, Fragment, useCallback, useMemo, useRef, Props, useEffect} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Text, View} from '../../Themed';
import {Calendar} from 'react-native-calendars';
import testIDs from './testIDs';
import {theme} from './MonthlyCallendarConfig'
import {FontAwesome5} from "@expo/vector-icons";
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import {Direction} from "react-native-calendars/src/types";
import {LocaleConfig} from 'react-native-calendars';
import {loadProfileDetails} from "../../../firebase/profile";
import {profileStore} from "../../../store/profile";
import {observer} from "mobx-react";
import {observe, toJS} from "mobx";
import {DailyReadPages} from "../../../models/Profile";
import Spacing from "../../../constants/Spacing";

const INITIAL_DATE = new Date();


LocaleConfig.locales['pl'] = {
    monthNames: [
        'Styczeń',
        'Luty',
        'Marzec',
        'Kwiecień',
        'Maj',
        'Czerwiec',
        'Lipiec',
        'Sierpień',
        'Wrzesień',
        'Październik',
        'Listopad',
        'Grudzień',
    ],
    monthNamesShort: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
    dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    dayNamesShort: ['Ndz', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So',],
    today: "Dziś"
};
LocaleConfig.defaultLocale = 'pl';

const MonthlyReadPages = () => {

    const convertDateToDashedDate = (date): string => {
        return date.toISOString().replace(/T.*/, '').split('-').join('-')
    }

    const [selected, setSelected] = useState(convertDateToDashedDate(INITIAL_DATE));
    const [markedDates, setMarkedDates] = useState({})

    useEffect(async () => {
        if (Object.keys(markedDates).length === 0) {
            await loadProfileDetails()

            const dailyReadPages = profileStore.dailyReadPages
            const convertedObject = {}
            dailyReadPages.forEach(item => {
                const key = convertFormSecondsToDashedDate(item.date.seconds)
                Object.assign(convertedObject, {
                    [key]: {
                        customStyles: {
                            container: {
                                backgroundColor: getMarkedDataColor(item.pages),
                            },
                        },
                        pages: item.pages
                    }
                })
            })
            setMarkedDates({...convertedObject})
        }
    });


    const convertFormSecondsToDashedDate = (seconds: number) => {
        const date = new Date(seconds * 1000);
        return convertDateToDashedDate(date)
    }


    const getMarkedDataColor = (pages: number): string => {
        if (pages >= 100) {
            return '#4CAF50'
        }
        if (pages > 10) {
            return '#FFC107'
        }
        return '#3F51B5'
    }

    const onDayPress = useCallback((day) => {
        setSelected(day.dateString);
    }, []);

    const Arrow = (direction: any) => {
        return (<FontAwesome5 size={FontSize.h4} name={direction.props === 'left' ? 'arrow-left' : 'arrow-right'}
                              color={Colors['dark'].tint}/>)
    }

    const SelectedData = () => {
        return (
            <View style={s.selectedDate}>
                {markedDates[selected] && (
                    <>
                        <Text>Data: {selected}</Text>
                        <Text>Przeczytane strony: {markedDates[selected].pages}</Text>
                    </>
                )}

            </View>
        )
    }

    const renderCalendarWithCustomMarkingType = () => {
        return (
            <View>
                <Fragment>
                    <Calendar
                        style={s.calendar}
                        hideExtraDays
                        enableSwipeMonths
                        current={convertDateToDashedDate(INITIAL_DATE)}
                        minDate={'2018-03-01'}
                        onDayPress={onDayPress}
                        markingType={'custom'}
                        theme={theme('dark')}
                        renderArrow={direction => <Arrow props={direction}/>}
                        markedDates={markedDates}
                    />
                </Fragment>
                <View>
                    <SelectedData/>
                </View>
            </View>
        );
    };


    const renderExamples = () => {
        return (
            <Fragment>
                {renderCalendarWithCustomMarkingType()}
            </Fragment>
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} testID={testIDs.calendars.CONTAINER}>
            {renderExamples()}
        </ScrollView>
    );
};

export default MonthlyReadPages;

const s = StyleSheet.create({
    calendar: {
        marginBottom: 10
    },
    selectedDate: {
        minHeight: '40px',
        marginTop: Spacing.sm,
        marginBottom: Spacing.md
    }
});
