import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomePage from './HomePage'; 
import ProfilePage from './ProfilePage';
import SettingsPage from './SettingsPage';
import FeedbackPage from './FeedbackPage';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <View style={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage}
        />
        <Text style={styles.drawerTitle}>Hello, User</Text>
      </View>
      
      <View style={styles.drawerItems}>
        <DrawerItem icon="home" label="Home" routeName="Home" navigation={navigation} />
        <DrawerItem icon="person" label="Profile" routeName="Profile" navigation={navigation} />
        <DrawerItem icon="settings" label="Settings" routeName="Settings" navigation={navigation} />
        <DrawerItem icon="chatbubbles" label="Feedback" routeName="Feedback" navigation={navigation} />
      </View>
    </View>
  );
}

// Custom DrawerItem Component
function DrawerItem({ icon, label, routeName, navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)} style={styles.drawerItem}>
      <Ionicons name={icon} size={24} color="#6200ea" />
      <Text style={styles.drawerItemText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerStyle: { backgroundColor: '#f9f9f9' },
        drawerLabelStyle: { fontSize: 16 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="Feedback" component={FeedbackPage} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  drawerHeader: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6200ea',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  drawerItems: {
    flex: 1,
    marginTop: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerItemText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#333',
  },
});