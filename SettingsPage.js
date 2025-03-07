import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, Alert, Button } from 'react-native';

const SettingsPage = () => {
  // State to handle light/dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
    Alert.alert('Theme Changed', `You are now in ${isDarkMode ? 'Light' : 'Dark'} Mode.`);
  };

  // Toggle Notifications
  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
    Alert.alert('Notifications', `Notifications are now ${isNotificationsEnabled ? 'Disabled' : 'Enabled'}.`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#fff' : '#6200ea'}
          trackColor={{ false: '#ccc', true: '#6200ea' }}
        />
      </View>

      <View style={styles.settingOption}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
          thumbColor={isNotificationsEnabled ? '#6200ea' : '#ccc'}
          trackColor={{ false: '#ccc', true: '#6200ea' }}
        />
      </View>

      <Button title="Save Settings" onPress={() => Alert.alert('Settings Saved', 'Your changes have been saved successfully.')} />
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsPage;
