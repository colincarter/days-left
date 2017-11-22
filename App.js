import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import timer from "react-native-timer";

const cornflowerblue = "#6495ed";

export default class App extends React.Component {
  to = "2017-11-20T13:17:00Z";

  constructor() {
    super();

    const timeToGo = countdown(this.to);

    this.state = {
      timeToGo: timeToGo,
      showGone: this.hasGone(timeToGo),
      showSad: this.hasGoneNow(timeToGo)
    };
  }

  hasGone = timeToGo =>
    timeToGo.days <= 0 &&
    timeToGo.hours <= 0 &&
    timeToGo.minutes <= 0 &&
    timeToGo.seconds <= 0;

  hasGoneNow = timeToGo => timeToGo.days <= -2;

  updateTime = () => {
    const timeToGo = countdown(this.to);

    this.setState({
      timeToGo: timeToGo,
      showGone: this.hasGone(timeToGo),
      showSad: this.hasGoneNow(timeToGo)
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
    if (this.state.showSad) {
      return (
        <View style={styles.container}>
          <Image source={require("./giphy-sad.gif")} />
          <Text> </Text>
          <Text style={styles.hrsmins}>Colin has been gone</Text>
          {this.renderCountDown(this.state.timeToGo)}
        </View>
      );
    }

    if (this.state.showGone) {
      return (
        <View style={styles.container}>
          <Image source={require("./giphy-gone.gif")} />
          <Text> </Text>
          <Text style={styles.togo}>And I am gone</Text>
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
  hrsmins: {
    fontSize: 30,
    fontWeight: "bold",
    color: cornflowerblue
  }
});

const countdown = endtime => {
  const t = Date.parse(endtime) - Date.parse(new Date());

  const seconds = Math.ceil((t / 1000) % 60);
  const minutes = Math.ceil((t / 1000 / 60) % 60);
  const hours = Math.ceil((t / (1000 * 60 * 60)) % 24);
  const days = Math.ceil(t / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds
  };
};
