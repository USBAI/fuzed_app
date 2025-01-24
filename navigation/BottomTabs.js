import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import HomeScreen from '../components/HomeScreen';
import LevelsScreen from '../components/LevelsScreen';
import ChallengeScreen from '../components/ChallengeScreen';
import ProfileScreen from '../components/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#242424',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarShowLabel: false,
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-variant';
          } else if (route.name === 'Levels') {
            iconName = 'format-list-bulleted';
          } else if (route.name === 'Challenge') {
            iconName = 'trophy-variant';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }
          return (
            <View 
              style={{ alignItems: 'center', justifyContent: 'center' }}
              onTouchEnd={() => {
                if (navigation.isFocused()) {
                  navigation.reset({
                    index: 0,
                    routes: [{ name: route.name }],
                  });
                }
              }}
            >
              <MaterialCommunityIcons name={iconName} size={28} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Levels" component={LevelsScreen} />
      <Tab.Screen name="Challenge" component={ChallengeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
