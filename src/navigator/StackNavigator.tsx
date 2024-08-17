import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useState } from 'react';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';

//interface - arreglo lista usuarios - objetos
export interface User {
    id: number;
    email: string;
    password: string;
}

const Stack = createStackNavigator();

export const StackNavigator = () => {
    //arreglo de usuarios: permitir inicio de sesión
    const users: User[] = [
        { id: 1, email: 'bduenas@gmail.com', password: '123456' },
        { id: 2, email: 'bduenas2@gmail.com', password: '1234567' }
    ];

    //hook useState: manipular el arreglo con la lista de usuarios
    const [listUsers, setListUsers] = useState(users);

    //función para agregar nuevos usuarios al arreglo
    const handleAddUser = (user: User) => {
        //operador propagación ... : crear una copia del arreglo
        setListUsers([...listUsers, user]);
    }

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle: {
                    backgroundColor: PRIMARY_COLOR
                }
            }}>
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                children={() => <LoginScreen users={listUsers} />} />
            <Stack.Screen
                name="Register"
                options={{ headerShown: false }}
                children={() => <RegisterScreen users={listUsers} handleAddUser={handleAddUser} />} />
            <Stack.Screen
                name='Home'
                options={{ headerShown: false }}
                component={HomeScreen}
            />
        </Stack.Navigator>
    );
}