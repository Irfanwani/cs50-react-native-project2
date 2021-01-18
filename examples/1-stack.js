import React from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

function randomNumber() {
   return Math.floor(Math.random() * 10);
}

class ScreenNameOne extends React.Component {
    static navigationOptions = {
        headerTitle: 'First Screen',
        headerTintColor: 'teal',
        // headerRight: () => <SomeComponentContainingSomeMoreOptionsToBeAddedToTheRightSideOfHeader />
        // headerLeft: () => <SomeComponentContainingSomeMoreOptionsToBeAddedToTheLeftSideOfHeader />
        headerStyle: {
            backgroundColor: 'orange'
        }
    }
    render() {
        return (
            <View style={styles.view1}>
                <Button title='go to screen two' onPress={() => this.props.navigation.navigate('SecondPage')} />
            </View>
        )
    }
}

class ScreenNameTwo extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: 'This is Second Screen',
            headerTintColor: 'orange',
            headerRight: () => <Button title='Btn' onPress={() => navigation.navigate('ThirdPage')} />,
            headerStyle: {
                backgroundColor: 'teal'
            }
        }
    }
    render() {
        return (
            <View style={styles.view2}>
                <Button title='go to screen three' onPress={() => {this.props.navigation.navigate('ThirdPage', {
                    number: randomNumber(),
                })}} />
            </View>
        )
    }
}

class ScreenNameThree extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: `Number: ${navigation.getParam('number')}`,
            headerTintColor: 'violet'
        }
    }
    render() {
        return (
            <View style={styles.view3}>
                <Text style={{fontSize: 25}}>{this.props.navigation.getParam('number')}</Text>
                <Button title='Get number' onPress={() => this.props.navigation.setParams({number: randomNumber() })} />
                <Button title='Go Back' onPress={() => this.props.navigation.goBack()} />
            </View>
        )
    }
}

const AppNavigator = createStackNavigator({
    FirstPage: ScreenNameOne,
    SecondPage: ScreenNameTwo,
    ThirdPage: ScreenNameThree,
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'teal',
    },

    view2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'orange',
    },

    view3: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 25,
        borderColor: 'violet',
    },
    
})