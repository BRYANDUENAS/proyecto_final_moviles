import React, { useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { PRIMARY_COLOR } from '../commons/constantsColor';
import { TitleComponent } from '../components/TitleComponent';
import { BodyComponent } from '../components/BodyComponent';
import { styles } from '../theme/appTheme';
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { User } from '../navigator/StackNavigator';

//interface - props
interface Props {
  users: User[];  //arreglo con la lista de usuarios
  handleAddUser: (user: User) => void; //función para añadir nuevos elementos al arreglo
}

//interface - formulario Registro
interface FormRegister {
  email: string;
  password: string;
  telefono: string;
  pais:string;
}

export const RegisterScreen = ({ users, handleAddUser }: Props) => {

  //hook useState: Manipular el estado del formulario
  const [formRegister, setFormRegister] = useState<FormRegister>({
    email: '',
    password: '',
    telefono:'',
    pais:''
  });

  //hook useState: permitir que la contraseña sea visible o no
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

  //hook useNavigation: permitir navegar de una pantalla a otra
  const navigation = useNavigation();

  //función que actualice el estado del formulario
  const handleSetValues = (name: string, value: string) => {
    setFormRegister({ ...formRegister, [name]: value });
  }

  //función que permita registrar usuario
  const handleSignUp = () => {
    //Validar que los campos se encuentren llenos
    if (!formRegister.email || !formRegister.password) {
      //Mensaje de aviso
      Alert.alert(
        "Error",
        "Por favor, completar todos los campos!"
      );
      return;
    }

    //Validar que no se registre un usuario ya existente
    if (verifyUser() != null) {
      Alert.alert(
        "Error",
        "El correo ya se encuentra registrado!"
      );
      return;
    }

    //Generar la información del nuevo usuario
    //Obtener en un arreglo los ids de los usuarios registrados
    const getIdUsers = users.map(user => user.id);  //[1,2]
    //Generando el id del nuevo usuario
    const getNewId = Math.max(...getIdUsers) + 1;
    //Crear el nuevo usuario - nuevo objeto de tipo User
    const newUser: User = {
      id: getNewId,
      email: formRegister.email,
      password: formRegister.password,
    }
    //Guardar el nuevo usuario en el arreglo
    handleAddUser(newUser);
    Alert.alert(
      "Felicitaciones",
      "Registro exitoso!"
    );
    navigation.goBack();
    //console.log(formRegister);
  }

  //función para verificar que el usuario está en la lista de usuarios - arreglo
  const verifyUser = (): User => {
    const existUser = users.filter(user => user.email === formRegister.email)[0];
    return existUser; //User | null
  }

  return (
    <View>
      <StatusBar backgroundColor={PRIMARY_COLOR} />
      <TitleComponent title='Regístrate' />
      <BodyComponent>
        <View>
          <Text
            style={styles.titleBody}>
            Estás muy cerca!
          </Text>
          <Text
            style={styles.descriptionBody}>
            Realiza tus compras de manera rápida y segura
          </Text>
        </View>
        <View style={styles.contentInput}>
          <InputComponent
            placeholder='Correo'
            handleSetValues={handleSetValues}
            name='email' />
          <InputComponent
            placeholder='Contraseña'
            handleSetValues={handleSetValues}
            name='password'
            isPassword={hiddenPassword}
            hasIcon={true}
            actionIcon={() => setHiddenPassword(!hiddenPassword)} />
            <InputComponent
            placeholder='Telefono'
            handleSetValues={handleSetValues}
            name='telefono' />
            <InputComponent
            placeholder='Pais'
            handleSetValues={handleSetValues}
            name='pais' />
        </View>
        <ButtonComponent textButton='Registrar' actionButton={handleSignUp} />
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
          <Text style={styles.textRedirection}>
            Ya tienes una cuenta? Iniciar sesión ahora
          </Text>
        </TouchableOpacity>
      </BodyComponent>
    </View>
  )
}
