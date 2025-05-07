import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, AppStateStatus, AppState } from 'react-native';


AppState.addEventListener('change', (state: AppStateStatus) => {
  if (state === 'active') {
    console.log('App has come to the foreground!');
  } else {
    console.log('App has gone to the background!');
  }
});

export default function UserAuthentication() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Authentication</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
