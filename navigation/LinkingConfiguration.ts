/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          MyList:{
            screens: {
              TabOneScreen: 'one',
            },
          },
          Top:{
            screens: {
              TabOneScreen: 'one',
            },
          },
          Search:{
            screens: {
              TabOneScreen: 'one',
            },
          },
          Profile:{
            screens: {
              TabOneScreen: 'one',
            },
          },
          Settings:{
            screens: {
              TabOneScreen: 'one',
            },
          }
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
