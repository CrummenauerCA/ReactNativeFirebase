import React from 'react'
import firebase from './firebase'
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native'
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base'

var data = ['Cezar', 'Augusto', 'Crummenauer']
export default class SignInContent extends React.Component {
  logoutUser = () => {
    firebase.auth().signOut()
  }

  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      ListViewData: data,
      newItem: ''
    }
  }

  render() {
    const provider = this.props.user.providerData[0].providerId
    const name = this.props.user.displayName
    return (
      <Container style={styles.container}>
        <Content style={{ marginTop: StatusBar.currentHeight, marginBottom: 20 }}>
          <List
            dataSource={this.ds.cloneWithRows(this.state.ListViewData)}
            renderRow={data =>
              <ListItem>
                <Text style={{ paddingLeft: 5 }}>
                  {data}
                </Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full>
                <Icon name="information-circle"></Icon>
              </Button>
            }
            renderRightHiddenRow={data =>
              <Button full danger>
                <Icon name="trash"></Icon>
              </Button>
            }
            leftOpenValue={70}
            rightOpenValue={-70}
          />
        </Content>
        <Text style={{ textAlign: 'center' }}>
          UID de usuário: {this.props.user.uid}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Nome de usuário: {name ? name : 'não fornecido'}
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Acesso através de: {provider == 'password' ? 'email e senha' : provider}
        </Text>
        <Button full rounded success style={{ marginLeft: 50, marginRight: 50, marginBottom: 10, marginTop:10 }}
          onPress={() => this.logoutUser()}>
          <Icon active name='log-in' />
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
  },
});
