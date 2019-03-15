import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from './firebase'
import { Container, Button } from 'native-base'

export default class SignInContent extends React.Component {
  logoutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <Container style={styles.container}>
        <Text>Usuário logado! Bem vindo</Text>
        <Text>UID do usuário: {this.props.user.uid}</Text>
        <Text>Nome de usuário: {this.props.user.displayName}</Text>
        <Text>Acessou usando: {this.props.user.providerData[0].providerId}</Text>
        <Button full rounded success style={{ marginTop: 10 }}
          onPress={() => this.logoutUser()}>
          <Text style={{ color: '#fff' }}>Sair da minha conta</Text>
        </Button>
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
