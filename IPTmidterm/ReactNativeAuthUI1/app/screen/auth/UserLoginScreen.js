import { View, Text, TextInput, Button, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styles, toastConfig } from '../../../style'
import Toast from 'react-native-toast-message';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

import { useLoginUserMutation } from '../../../services/userAuthApi';
import { storeToken } from '../../../services/AsyncStorageService';

const UserLoginScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const clearTextInput = () => {
    setEmail('')
    setPassword('')
  }

  const [loginUser] = useLoginUserMutation()

  const handleFormSubmit = async () => {
    const formData = { email, password }
    const res = await loginUser(formData)
    if (res.data) {
      // console.log("Response Data", res.data)
      await storeToken(res.data.token)  // Store Token in Storage
      clearTextInput()
      navigation.navigate('UserPanelTab')
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors)
      Toast.show({
        type: 'warning',
        position: 'top',
        topOffset: 0,
        ...(res.error.data.errors.email ? { text1: res.error.data.errors.email[0] } : ''),
        ...(res.error.data.errors.password ? { text1: res.error.data.errors.password[0] } : ''),
        ...(res.error.data.errors.non_field_errors ? { text1: res.error.data.errors.non_field_errors[0] } : '')
      })
    }
  }

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={{ marginHorizontal: 30 }}>
          <View style={{ alignSelf: 'center', marginBottom: 10 }}>
            <MaterialIcon name='account-circle' color='blue' size={100} />
          </View>
          <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType='email-address' />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry={true} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('SendPasswordResetEmail') }} >
                <Text style={{ fontWeight: 'bold' ,alignSelf:'flex-start', marginTop: 20}}>Forgot Password?</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableWithoutFeedback onPress={() => { navigation.navigate('Registration') }}>
                <Text style={{ fontWeight: 'bold', alignSelf:'flex-end', marginTop: 20}}>Don't Have an Account? Register</Text>
              </TouchableWithoutFeedback>
            </View>          
          </View>
            <View style={{ flex: 1, width: 250, alignSelf: 'center', marginTop: 30 }}>
              <Button title='Login' onPress={handleFormSubmit} color='blue' />
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserLoginScreen