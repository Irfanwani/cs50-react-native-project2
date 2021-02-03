import React from 'react'
import { View, Text } from 'react-native'

export default class MoreDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: ''
        }
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('title')
    })

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch(`http://www.omdbapi.com/?i=${this.props.navigation.getParam('i')}&apikey=3bc90adf`)
        const result = await response.json()
        this.setState({details: result})
        this.props.navigation.setParams({title: this.state.details.Title})

    } 

    render() {
        return (
            <View>
                <Text>This is details page and this is the id: {this.props.navigation.getParam('i')}</Text>
                <Text>{this.state.details.Title}</Text>
                <Text>{this.state.details.Year}</Text>
                <Text>{this.state.details.Released}</Text>
            </View>
        )
    }
}