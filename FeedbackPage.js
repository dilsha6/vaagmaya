import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (!feedback) {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setFeedback(''); e
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feedback</Text>
      <Text style={styles.description}>We value your feedback. Please provide your thoughts below:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your feedback here"
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />
      <Button title="Submit Feedback" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
});

export default FeedbackPage;
