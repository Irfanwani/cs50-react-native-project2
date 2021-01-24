import React from 'react'
import { View, StyleSheet, Text, Button, TextInput } from 'react-native'


export default class Login extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: () => `${navigation.getParam('name')}`,
            headerTintColor: 'teal',
            headerStyle:  {
                backgroundColor: 'skyblue',
            }
        }
    }
    constructor() {
        super();
        this.state = {
            isDisabled: true,
            username: '',
            password: ''
        }
    }

    takeUsername = username => {
        this.setState({username}, this.isValid)
    }

    takePassword = password => {
        this.setState({password}, this.isValid)
    }

    isValid = () => {
        if(this.state.username.length >= 3 && this.state.password.length >= 8) {
            this.setState({
                isDisabled: false
            })
        }else {
            this.setState({
                isDisabled: true
            })
        }
    }

    visitSite = () => {
        this.props.navigation.navigate('secondSwitch', {name: this.state.username, password: this.state.password});
    }
    
    render() {
        return (
            <View style={styles.view}>
                <TextInput style={styles.input} value={this.state.username} onChangeText={this.takeUsername} placeholder="Username" />
                <TextInput style={styles.input} value={this.state.password} onChangeText={this.takePassword} placeholder="Password" />
                <Button title='Login' onPress={this.visitSite} disabled={this.state.isDisabled} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        paddingHorizontal: 130,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: 'teal',
    }
})