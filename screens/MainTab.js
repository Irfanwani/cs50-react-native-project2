import React from 'react'
import {ScrollView, Text, View, Switch, StyleSheet, TouchableOpacity} from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/MaterialIcons'

let todoList = require('../examples/todos')


class Todo extends React.Component {
    render() {
        return (
            <View style={styles.view}>
                <Switch />
                <TouchableOpacity style={styles.btn} >                      
                    <Text style={{color: 'teal', fontSize: 25}}>{this.props.todoText}</Text>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <CheckBox />
                    <TouchableOpacity>
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
            headerTitle: navigation.dangerouslyGetParent().dangerouslyGetParent().getParam('name'),
            headerTintColor: 'teal',
            headerRight: () => <View style={{marginHorizontal: 10}}>
                                    <TouchableOpacity onPress={() => navigation.navigate('AddTodo')}>
                                        <Icon name='add-circle' size={30} color='green' />                      
                                    </TouchableOpacity>
                                </View>
        }
    }

    render() {
        return (
            <View style={{marginTop: 5}}>
                <ScrollView>
                        <Text style={styles.text}>
                            Number of TODOS: {todoList.length}
                        </Text>
                        <Text style={styles.text}>Number of Checked Todos:</Text>
                        {todoList.default.map(todo => <Todo key={todo} todoText={todo} />)}
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