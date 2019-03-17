import React from 'react'
import firebase from './firebase'
import { StyleSheet, Text } from 'react-native'
import { Container, Button, Icon } from 'native-base'

export default class SignInContent extends React.Component {
  logoutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text style={{ fontSize: 26, textAlign: 'center' }}>
          Verificando informações de autenticação...
        </Text>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 50,
  },
});
