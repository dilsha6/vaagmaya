import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For adding an icon to the log out button

const ProfilePage = ({ navigation }) => {
  
  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', onPress: () => navigation.navigate('Home') }, // Navigate to home or login screen
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      {/* Profile Image */}
      <Image
        style={styles.profileImage}
        source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual profile picture URL
      />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Archana</Text>
        <Text style={styles.userBio}>A passionate developer and tech enthusiast. Always eager to learn new things!</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
        <Ionicons name="md-create" size={24} color="#fff" />
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="md-log-out" size={24} color="#fff" />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* Go Back Button */}
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#6200ea',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#6200ea',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  userBio: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  editButton: {
    flexDirection: 'row',
    backgroundColor: '#6200ea',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '80%',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ProfilePage;