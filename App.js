import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from './firebase'
import Auth from './auth'
import SignInContent from './signInContent'

import { Container, Button } from 'native-base'

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
      <SignInContent user={this.state.user} />
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
