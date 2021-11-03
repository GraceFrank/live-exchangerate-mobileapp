import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import io from "socket.io-client";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar, Header } from "react-native-elements";
import images from "./assets/images";

import { render } from "react-dom";
// import { API_BASE_URL } from "react-native-dotenv";
const socket = io.connect("http://localhost:5000/");

export default function App() {
  const [exchangeRates, setExchangeRates] = useState([]);

  const renderExchangeRates = exchangeRates.map(({ ticker }, i) => {
    return (
      <ListItem key={i} bottomDivider>
        <Avatar source={images[ticker.base]} />
        <ListItem.Content>
          <ListItem.Title>{ticker.base}</ListItem.Title>
          <ListItem.Subtitle>
            ${Number(ticker.price).toLocaleString()}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });

  useEffect(() => {
    socket.on("exchangeRateUpdate", (payload) => {
      setExchangeRates(payload);
      console.log(payload);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          style={styles.header}
          centerComponent={{ text: "Exchange Rates", style: { color: "#fff" } }}
          rightComponent={{ icon: "home", color: "#fff" }}
          containerStyle={styles.header}
        />
        <StatusBar style="auto" />
        {renderExchangeRates}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
  header: {
    backgroundColor: "black",
    fontWeight: "bold",
  },
});
