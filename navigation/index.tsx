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
import {ColorSchemeName, Pressable, Text} from 'react-native';

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
import LogIn from '../screens/LogIn'
import SignIn from "../screens/SingIn";
import {observer} from "mobx-react";
import {useState} from "react";
import {userStore} from "../store/user.store";
import {Button} from "../components/Themed";

const isLoggedIn = false

const logUserFromStorage = () => {

}

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const AuthStack = createNativeStackNavigator();

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = observer(()=> {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={ userStore.isLogged ? BottomTabNavigator : AuthStackView} options={{headerShown: false}}/>
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
        </Stack.Navigator>
    );
})

function AuthStackView({navigation}:any){
    return(
        <AuthStack.Navigator>
            <Stack.Screen name="Login" component={LogIn} options={{headerShown: false}}/>
            <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        </AuthStack.Navigator>
    )
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

const SearchStack = createNativeStackNavigator();

function SearchStackScreen({navigation}:any) {
    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen name="Search" component={Search} />
            <SearchStack.Screen  name="Details" component={BookDetails} />
        </SearchStack.Navigator>
    );
}
const MyBookshelfStack = createNativeStackNavigator();

function MyBookshelfStackScreen({navigation}:any) {
    return (
        <MyBookshelfStack.Navigator initialRouteName="Search">
            <MyBookshelfStack.Screen name="MyBookShelf" component={MyList} />
            <MyBookshelfStack.Screen  name="Details" component={BookDetails} />
        </MyBookshelfStack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            backBehavior='history'
            initialRouteName="Profile"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="MyList"
                component={MyBookshelfStackScreen}
                options={{
                    unmountOnBlur:true,
                    tabBarIcon: ({color}) => <TabBarIcon name="book-open" color={color}/>,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name="TopStack"
                component={TopStackScreen}
                options={{
                    unmountOnBlur:true,
                    tabBarIcon: ({color}) => <TabBarIcon name="hotjar" color={color}/>,
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            />
            <BottomTab.Screen
                name="SearchStack"
                component={SearchStackScreen}
                options={{
                    unmountOnBlur:true,
                    tabBarIcon: ({color}) => <TabBarIcon name="search" color={color}/>,
                    tabBarShowLabel: false,
                    headerShown: false,
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
