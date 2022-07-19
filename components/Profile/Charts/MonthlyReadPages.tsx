import React, {useState, Fragment, useCallback, useMemo, useRef, Props} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Text, View } from '../../Themed';
import {Calendar} from 'react-native-calendars';
import testIDs from './testIDs';
import {theme} from './MonthlyCallendarConfig'
import {FontAwesome5} from "@expo/vector-icons";
import FontSize from "../../../constants/FontSize";
import Colors from "../../../constants/Colors";
import {Direction} from "react-native-calendars/src/types";
import {LocaleConfig} from 'react-native-calendars';

const INITIAL_DATE = '2018-03-01';


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
    dayNamesShort: ['Ndz','Pn','Wt','Śr','Cz','Pt','So',],
    today: "Dziś"
};
LocaleConfig.defaultLocale = 'pl';

const MonthlyReadPages = () => {
    const [selected, setSelected] = useState(INITIAL_DATE);

    const onDayPress = useCallback((day) => {
        console.log('day',day)
        setSelected(day.dateString);
    }, []);

    const Arrow = (direction:any) => {
        console.log('direction',direction)
        return (<FontAwesome5 size={FontSize.h4} name={direction.props === 'left' ? 'arrow-left' : 'arrow-right'}
                      color={Colors['dark'].tint}/>)
    }

    const SelectedData = () => {
        const test:any = {
            '2018-03-01':9,
            '2018-03-08':45,
            '2018-03-09':18,
            '2018-03-14':234,
            '2018-03-15':33,
        }
        return(test[selected] ? <Text >{selected}:{test[selected]}</Text> : <Text/>)
    }

    const renderCalendarWithCustomMarkingType = () => {
        return (
            <View>
            <Fragment>
                <Calendar
                    style={styles.calendar}
                    hideExtraDays
                    enableSwipeMonths
                    current={INITIAL_DATE}
                    minDate={'2018-03-01'}
                    onDayPress={onDayPress}
                    markingType={'custom'}
                    theme={theme('dark')}
                    renderArrow={direction => <Arrow props={direction} />}
                    markedDates={{
                        '2018-03-01': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'blue',
                                },
                            }
                        },
                        '2018-03-08': {
                            selected: true
                        },
                        '2018-03-09': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'blue',
                                },
                            }
                        },
                        '2018-03-14': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'green'
                                },
                            }
                        },
                        '2018-03-15': {
                            customStyles: {
                                container: {
                                    backgroundColor: 'yellow',
                                    elevation: 2
                                },
                            }
                        },
                    }}
                />
            </Fragment>
                <View>
                    <Text>Wybrana data:</Text>
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

const styles = StyleSheet.create({
    calendar: {
        marginBottom: 10
    }
});
