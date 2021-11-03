import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { StyleSheet, Text, View } from "react-native";
import { render } from "react-dom";
// import { API_BASE_URL } from "react-native-dotenv";
const socket = io.connect("http://localhost:5000/");

export default function App() {
  const [exchangeRates, setExchangeRates] = useState([]);

  const renderExchangeRates = exchangeRates.map((rate) => {
    return <Text>{rate.timestamp}</Text>;
  });

  useEffect(() => {
    socket.on("exchangeRateUpdate", (payload) => {
      setExchangeRates(payload);
      console.log(payload);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Expo App {"API_BASE_URL"}</Text>
      <StatusBar style="auto" />
      {renderExchangeRates}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
