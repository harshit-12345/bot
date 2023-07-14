import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#DCF8C6',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    maxWidth: '70%',
  },
  botMessage: {
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
    maxWidth: '70%',
  },
});

const ChatbotApp = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, fromUser: true },
      ]);
      setInputText('');
    }
  };

  useEffect(() => {
    // Simulating the bot's response
    const simulateBotResponse = async () => {
      if (messages[messages.length - 1]?.fromUser) {
        // Simulating a delay before the bot responds
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'This is a sample response from the chatbot.', fromUser: false },
        ]);
      }
    };

    simulateBotResponse();
  }, [messages]);

  const renderMessage = ({ item }) => {
    const messageStyle = item.fromUser ? styles.userMessage : styles.botMessage;
    return (
      <View style={styles.messageContainer}>
        <View style={messageStyle}>
          <Text>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        inverted
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, marginRight: 8, borderWidth: 1, padding: 8, borderRadius: 8 }}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatbotApp;
