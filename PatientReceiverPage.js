import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For adding icons

const PatientReceiverPage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Patient Receiver Page</Text>
      
      {/* CP Patient Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>CP Patient Section</Text>
        <Text style={styles.sectionText}>
          Here you can manage details of the CP Patient. Add patient details, monitor progress, and much more.
        </Text>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="md-information-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Patient Details</Text>
        </TouchableOpacity>
      </View>

      {/* Receiver Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Receiver Section</Text>
        <Text style={styles.sectionText}>
          Here you can manage details of the Receiver. Add receiver information and monitor progress.
        </Text>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="md-person-add" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Receiver Details</Text>
        </TouchableOpacity>
      </View>

      {/* Go Back Button */}
      <View style={styles.goBackButton}>
        <Button title="Go Back" onPress={() => navigation.goBack()} color="#6200ea" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 3, // Add shadow effect for Android
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 5, // iOS shadow
    shadowOffset: { width: 0, height: 3 }, // iOS shadow
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 30,
  },
});

export default PatientReceiverPage;