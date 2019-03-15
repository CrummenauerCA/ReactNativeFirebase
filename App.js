import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from './firebase'
import Auth from './auth'

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  logoutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    if (!this.state.user) return <Auth />
    return (
      <Container style={styles.container}>
        <Text>Usuário logado! Bem vindo</Text>
        <Text>UID do usuário: {this.state.user.uid}</Text>
        <Text>Nome de usuário: {this.state.user.displayName}</Text>
        <Text>Acessou usando: {this.state.user.providerData[0].providerId}</Text>
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
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
});
