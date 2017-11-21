import React from "react";
import { StyleSheet, Text, View } from "react-native";
import timer from "react-native-timer";

const cornflowerblue = "#6495ed";

export default class App extends React.Component {
  to = "2017-11-24T16:00:00";

  constructor() {
    super();

    this.state = {
      timeToGo: countdown(this.to)
    };
  }

  updateTime = () => {
    this.setState({ timeToGo: countdown(this.to) });
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
        <Text style={styles.leaving}>I am leaving in...</Text>
        <Text> </Text>
        <Text style={styles.togo}>{this.state.timeToGo.days} days</Text>
        <Text style={styles.hrsmins}>
          {this.state.timeToGo.hours} hrs {this.state.timeToGo.minutes} mins{" "}
          {this.state.timeToGo.seconds} secs
        </Text>
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
  },
  hrsmins: {
    fontSize: 30,
    fontWeight: "bold",
    color: cornflowerblue
  }
});

const countdown = endtime => {
  const t = Date.parse(endtime) - Date.parse(new Date());

  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds
  };
};
