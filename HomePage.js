import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Animated,
} from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons'; 

const recognizeSpeech = async (audioUri) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("This is the recognized text from the audio.");
    }, 2000);
  });
};

const HomePage = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [recording, setRecording] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scaleValue = useState(new Animated.Value(1))[0];

  const startPulsing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow microphone access to record audio.');
        return;
      }

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setIsRecording(true);

      startPulsing();
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Error', 'Failed to start recording. Please try again.');
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setAudioUri(uri);
        setRecording(null);
        setIsRecording(false);

        setIsLoading(true);
        const text = await recognizeSpeech(uri);
        setRecognizedText(text);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
      Alert.alert('Error', 'Failed to stop recording. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/a.jpg')}
      style={styles.background}
      blurRadius={10}
    >
      <View style={styles.header}>
        <Text style={styles.appName}>Vaagmaya</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.greeting}>Hey User, Talk</Text>

        <Animated.View
          style={[styles.recordingButton, { transform: [{ scale: scaleValue }] }]}
        >
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={styles.recordingButtonInner}
          >
            <Ionicons
              name={isRecording ? "mic-off" : "mic"}
              size={60}
              color="#fff"
            />
          </TouchableOpacity>
        </Animated.View>

        {isLoading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}
        
        {recognizedText && (
          <View style={styles.recognizedTextContainer}>
            <Text style={styles.recognizedTextTitle}>Recognized Text:</Text>
            <Text style={styles.recognizedText}>{recognizedText}</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  header: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  appName: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  recordingButton: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ff5252',
  },
  recordingButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ff5252',
  },
  loader: { marginTop: 20 },
  recognizedTextContainer: {
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  recognizedTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  recognizedText: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomePage;
