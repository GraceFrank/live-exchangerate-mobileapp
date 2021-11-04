import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import io from "socket.io-client";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar, Header } from "react-native-elements";
import { LinearProgress } from "react-native-elements";
const avatarSource = "https://cryptoicon-api.vercel.app/api/icon/";

const socket = io("http://127.0.0.1:5000/");

export default function App() {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState([]);

  const renderExchangeRates = exchangeRates.map(({ ticker }, i) => {
    return (
      <ListItem key={i} bottomDivider>
        <Avatar
          source={{
            uri: `${avatarSource}${String(ticker.base).toLowerCase()}`,
          }}
        />
        <ListItem.Content>
          <ListItem.Title>{ticker.base}</ListItem.Title>
          <ListItem.Subtitle>
            ${Number(ticker.price).toLocaleString()}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Text>{ticker.volume}</Text>
      </ListItem>
    );
  });

  useEffect(() => {
    // var ws = new WebSocket("ws://127.0.0.1:5000/");

    // setLoading(true);
    // ws.onmessage = (e) => {
    //   // a message was received
    //   console.log(e.data);
    //   setLoading(false);
    // };

    socket.on("connection", (socket) => {
      console.log("LOOOgeeDDDDD", socket.handshake.headers); // an object containing "my-custom-header": "1234"
    });
    socket.on("exchangeRateUpdate", (payload) => {
      setLoading(false);
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
        {loading && (
          <View>
            <LinearProgress color="secondary" />
            <Text style={{ textAlign: "center", color: "white" }}>
              Loading...
            </Text>
          </View>
        )}
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
