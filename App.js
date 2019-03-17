import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import firebase from './firebase'
import Auth from './auth'
import Load from './load'
import SignInContent from './signInContent'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: 'initial',
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
    console.log('componentDidMount - onAuthStateChanged')
  }

  logoutUser = () => {
    firebase.auth().signOut()
  }

  render() {
    if (this.state.user == 'initial') return <Load />
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
    justifyContent: 'center',
    padding: 50,
  },
});
