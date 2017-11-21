import React from "react";
import { StyleSheet, Text, View } from "react-native";
import timer from "react-native-timer";
import moment from "moment";

const cornflowerblue = "#6495ed";

export default class App extends React.Component {
  to = "2017-11-24T16:00:00";

  constructor() {
    super();

    const timeToGo = moment().to(this.to, true);

    this.state = {
      to: this.to,
      timeToGo
    };
  }

  updateTime = () => {
    const now = moment();
    this.setState({ timeToGo: now.to(this.to, true) });
  };

  componentDidMount() {
    this.timer = timer.setInterval("dateTimer", this.updateTime, 1000);
  }

  componentWillUnmount() {
    timer.clearInterval("dateTimer");
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.leaving}>Leaving in...</Text>
        <Text style={styles.togo}>{this.state.timeToGo}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  leaving: {
    fontSize: 20
  },
  togo: {
    fontSize: 50,
    fontWeight: "bold",
    color: cornflowerblue
  }
});
