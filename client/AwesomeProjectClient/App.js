
import { StyleSheet, Text, View, FlatList} from 'react-native';

import React, { Component } from "react";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", movies: []};
    }

    callAPI() {
        fetch("http://localhost:3000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    callMoviesAPI() {
        fetch("https://reactnative.dev/movies.json")
            .then(res => res.json())
            .then((json) => this.setState({ movies: json.movies }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
        this.callMoviesAPI();
    }

    render() {
        return (
          <View style={styles.container}>
      <Text>Data from server api: {this.state.apiResponse}</Text>
      <View>
      <Text>Data from external API: </Text>
        <FlatList
            data={this.state.movies}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
      </View>
    </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
