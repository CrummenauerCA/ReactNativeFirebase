import React from 'react'
import firebase from './firebase'
import { StyleSheet, Text } from 'react-native'
import { Container, Form, Input, Item, Button, Label, Icon } from 'native-base'

export default class Auth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  signUpUser = () => {
    if (this.state.password.length < 6) {
      alert('Insira uma senha com pelo menos 6 caracteres')
    } else {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
        alert('Erro ao cadastrar com email e senha! Verifique os dados inseridos e tente novamente.')
        console.log(error)
      })
    }
  }

  loginUser = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      alert('Erro ao acessar com email e senha! Verifique os dados inseridos e tente novamente.')
      console.log(error)
    })
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1240328362782956', { permissions: ['public_profile'] })

    if (type == 'success') {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(credentials).catch(error => {
        alert('Deu ruim!')
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Text style={{ fontSize: 26, textAlign: 'center' }}>Acesar minha conta</Text>
          <Item floatingLabel>
            <Label><Icon active name='mail' style={{ fontSize: 20 }} /> Email</Label>
            <Input autoCorrect={false} autoCapitalize="none"
              onChangeText={(email) => this.setState({ email })} />
          </Item>

          <Item floatingLabel>
            <Label><Icon active name='key' style={{ fontSize: 20 }} /> Senha</Label>
            <Input secureTextEntry={true} autoCorrect={false} autoCapitalize="none"
              onChangeText={(password) => this.setState({ password })} />
          </Item>

          <Button full rounded info iconRight style={{ marginTop: 10 }}
            onPress={() => this.loginUser()}>
            <Icon active name='log-in' />
            <Text style={{ color: '#fff' }}>Acessar com email e senha</Text>
          </Button>

          <Button large full rounded primary iconRight style={{ marginTop: 10 }}
            onPress={() => this.loginWithFacebook()}>
            <Icon active name='logo-facebook' />
            <Text style={{ color: '#fff' }}>Acessar com o Facebook</Text>
          </Button>

          <Button full rounded success iconRight style={{ marginTop: 10 }}
            onPress={() => this.signUpUser()}>
            <Icon active name='add' />
            <Text style={{ color: '#fff' }}>Cadastrar uma nova conta</Text>
          </Button>
        </Form>
      </Container>
    );
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
