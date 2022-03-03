/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome5} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, Pressable} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import BookDetails from '../screens/BookDetails';
import NotFoundScreen from '../screens/NotFoundScreen';
import MyList from '../screens/MyList';
import Top from '../screens/Top';
import Search from '../screens/Search'
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const TopStack = createNativeStackNavigator();


function TopStackScreen({navigation}:any) {
    return (
        <TopStack.Navigator initialRouteName="Top">
            <TopStack.Screen name="Top" component={Top} />
            <TopStack.Screen  name="Details" component={BookDetails} />
        </TopStack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            backBehavior='history'
            initialRouteName="MyList"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="MyList"
                component={MyList}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="book-open" color={color}/>,
                    tabBarShowLabel: false
                }}
            />
            <BottomTab.Screen
                name="TopStack"
                component={TopStackScreen}
                options={{
                    unmountOnBlur:true,
                    tabBarIcon: ({color}) => <TabBarIcon name="hotjar" color={color}/>,
                    tabBarShowLabel: false,
                    headerShown: false
                }}
            />
            <BottomTab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="search" color={color}/>,
                    tabBarShowLabel: false
                }}
            />
            <BottomTab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="user" color={color}/>,
                    tabBarShowLabel: false
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="cog" color={color}/>,
                    tabBarShowLabel: false
                }}
            />
        </BottomTab.Navigator>
    );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome5>['name'];
    color: string;
}) {
    return <FontAwesome5 size={30}  {...props} />;
}
