import React from 'react'
import {ScrollView, Text, View, Switch, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {todoList} from './AddTodoScreen'
import RNRestart from 'react-native-restart';


class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            isOn: false
        }
    }

    changeCheck = () => {
        this.setState(prevState => ({isChecked: !prevState.isChecked}))
    }

    changeOn = () => {
        this.setState(prevState => ({isOn: !prevState.isOn}))
    }

    removeTodo = () => {
        if(this.state.isChecked) {
            todoList.default.splice(this.props.id, 1);
            RNRestart.Restart();
            ToastAndroid.show('Todo deleted successfully!', ToastAndroid.SHORT);
        }else {
            ToastAndroid.show('Please check the ckeckbox in the bottom-left corner', ToastAndroid.SHORT);
        }
    }

    render() {
        return (
            <View style={styles.view}>
                <Switch value={this.state.isOn} onValueChange={this.changeOn} />
                <TouchableOpacity style={styles.btn} >                      
                    <Text style={{color: 'teal', fontSize: 25}}>{String(this.props.todoText).toUpperCase()}</Text>
                    <Text style={{color: 'teal', fontSize: 25}}>{this.props.id}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox value={this.state.isChecked} onValueChange={this.changeCheck} />
                    <TouchableOpacity onPress={this.removeTodo}>
                        <Icon name='delete' size={30} color='brown' />                      
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}



export default class MainTab extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: String(navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('name')).toUpperCase(),
            headerTintColor: 'teal',
            headerRight: () => <View style={{marginHorizontal: 10}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
                                        <Icon name='add-circle' size={40} color='teal' />                      
                                    </TouchableOpacity>
                                </View>
        }
    }

    render() {
        if(todoList.default == false) {
            return (
                <View style={{marginHorizontal: 10}}>
                    <Text style={{color: 'grey', fontSize: 20}}>Nothing to Show. In the Top-right corner or down below click on the 'PLUS' icon and add some new todos.</Text>
                    <TouchableOpacity style={{alignItems: 'center', marginTop: 10}} onPress={() => this.props.navigation.navigate('AddTodo')}><Icon name='add-circle' color='teal' size={50} /></TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={{marginTop: 5}}>
                <ScrollView>
                        <Text style={styles.text}>
                            Number of TODOS: {todoList.default.length}
                        </Text>
                        <Text style={styles.text}>Number of Checked Todos:{}</Text>
                        {todoList.default.map(todo => <Todo key={todoList.default.indexOf(todo)} id={todoList.default.indexOf(todo)} todoText={todo} />)}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        paddingVertical: 5
    },

    view: {
        borderWidth: 1, 
        borderColor: 'teal',
        borderRadius: 10,
        marginBottom: 5,
        marginHorizontal: 10, 
        paddingHorizontal: 7, 
        paddingVertical: 7
    },
    
    text: {
        color: 'purple', 
        fontSize: 16, 
        marginBottom: 5,
        marginLeft: 10
    },
})