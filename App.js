import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import timer from "react-native-timer";

const cornflowerblue = "#6495ed";

export default class App extends React.Component {
  to = "2017-11-24T16:00:00Z";

  constructor() {
    super();

    const timeToGo = countdown(this.to);

    this.state = {
      timeToGo: timeToGo,
      showGone: this.hasGone(timeToGo)
    };
  }

  hasGone = timeToGo =>
    timeToGo.days <= 0 &&
    timeToGo.hours <= 0 &&
    timeToGo.minutes <= 0 &&
    timeToGo.seconds <= 0;

  updateTime = () => {
    const timeToGo = countdown(this.to);

    this.setState({
      timeToGo: timeToGo,
      showGone: this.hasGone(timeToGo)
    });
  };

  componentDidMount = () => {
    timer.setInterval("dateTimer", this.updateTime, 1000);
  };

  componentWillUnmount = () => {
    timer.clearInterval("dateTimer");
  };

  renderCountDown = ({ days, hours, minutes, seconds }) => {
    days = Math.abs(days);
    hours = Math.abs(hours);
    minutes = Math.abs(minutes);
    seconds = Math.abs(seconds);

    const daysText = days === 1 ? "day" : "days";
    const hoursText = hours === 1 ? "hr" : "hrs";
    const minText = minutes === 1 ? "min" : "mins";
    const secText = seconds === 1 ? "sec" : "secs";

    return (
      <View style={styles.timeToGo}>
        <Text style={styles.togo}>
          {days} {daysText}
        </Text>
        <Text style={styles.hrsmins}>
          {hours} {hoursText} {minutes} {minText} {seconds} {secText}
        </Text>
      </View>
    );
  };

  render = () => {
    if (this.state.showGone) {
      return (
        <View style={styles.containerGone}>
          <Image source={require("./giphy-gone.gif")} />
          <Text> </Text>
          <Text style={styles.gone}>Colin has gone</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.leaving}>Colin is leaving in...</Text>
        <Text> </Text>
        {this.renderCountDown(this.state.timeToGo)}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  containerGone: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  timeToGo: {
    alignItems: "center",
    justifyContent: "center"
  },
  leaving: {
    fontSize: 20,
    fontWeight: "bold",
    color: cornflowerblue
  },
  togo: {
    fontSize: 50,
    fontWeight: "bold",
    color: cornflowerblue
  },
  gone: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff"
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
