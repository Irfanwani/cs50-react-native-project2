import React from 'react'
import {Dimensions, View, StyleSheet, TextInput, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class Movie extends React.Component {
    render() {
        return (
            <View style={styles.movie}>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('secondStack', {i: this.props.movie.imdbID})}>
                    <Image style={{height: 50, width: 50, marginLeft: 5}} source={{uri: this.props.movie.Poster}} />
                    <View>
                        <Text style={{marginLeft: 5, maxWidth: (Dimensions.get('window').width - 100)}}>{this.props.movie.Title}</Text>
                        <Text style={{marginLeft: 5}}>{this.props.movie.Year}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default class Search extends React.Component {
    static navigationOptions = {
        headerTitle: 'Search Movies',
    }

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            result: '',
        }
    }

    getSearch = search => {
        this.setState({search}, this.result)
    }

    result = async () => {
        const response = await fetch(`http://www.omdbapi.com/?s=${this.state.search}&apikey=3bc90adf`)
        const {Search} = await response.json();
        this.setState({result: Search})
    }

    renderItem = ({item}) => <Movie movie={item} navigation={this.props.navigation} />

    render() {
        return (
            <View>
                <FlatList
                    ListHeaderComponent={() => <View style={styles.view}>
                                                <Icon name='search' size={25} color='teal' />
                                                <TextInput placeholder='Search here...' value={this.state.search} onChangeText={this.getSearch} />
                                            </View>} 
                    renderItem={this.renderItem} 
                    data={this.state.result} 
                    keyExtractor={item => item.imdbID} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'teal',
        borderRadius: 20, 
        paddingRight: 80,
        paddingVertical: 5,
        marginVertical: 10,
        marginHorizontal: 10
    },
    movie: {
        borderWidth: 2,
        borderColor: 'green',
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 5
    }
})