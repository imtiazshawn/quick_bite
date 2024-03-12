import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { 
    BellAlertIcon, 
    HeartIcon, 
    HomeIcon, 
    ShoppingBagIcon, 
    UserCircleIcon 
} from 'react-native-heroicons/outline';

import HomeScreen from '../screens/HomeScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from '../screens/CartScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({}) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 0,
                    backgroundColor: '#FFFFFF',
                    height: 70,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    ...styles.shadow
                },
                tabBarActiveTintColor: '#f9c22d',
            })}
        >
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HomeIcon size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Favourite' component={FavouriteScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HeartIcon size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Cart' component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <View style={{ 
                            top: -25,
                            backgroundColor: '#f9c22d',
                            padding: 10,
                            height: 70,
                            width: 70,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            ...styles.shadow
                        }}>
                            <ShoppingBagIcon size={size} color='#000' />
                        </View>
                    ),
                }}
            />
            <Tab.Screen name='Notification' component={NotificationScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <BellAlertIcon size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <UserCircleIcon size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});
