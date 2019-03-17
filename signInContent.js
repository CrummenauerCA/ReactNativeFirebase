import React from 'react'
import firebase from './firebase'
import { StyleSheet, Text } from 'react-native'
import { Container, Button, Icon } from 'native-base'

export default class SignInContent extends React.Component {
  logoutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    const provider = this.props.user.providerData[0].providerId
    const name = this.props.user.displayName
    return (
      <Container style={styles.container}>
        <Text style={{ fontSize: 26, textAlign: 'center', margin: 32 }}>
          Usuário logado!
        </Text>
        <Text style={{ textAlign: 'center' }}>
          UID: {this.props.user.uid};
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Nome: {name ? name : 'não fornecido'};
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Acessado por: {provider == 'password' ? 'email e senha' : provider}.
        </Text>
        <Button full rounded success style={{ margin: 48 }}
          onPress={() => this.logoutUser()}>
          <Icon active name='log-in' />
          <Text style={{ color: '#fff' }}>Sair</Text>
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
