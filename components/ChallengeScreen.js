import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import { io } from 'socket.io-client';

export default function ChallengeScreen() {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [socket, setSocket] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const challenges = [
    { id: '1', name: 'Push-ups', icon: 'fitness' },
    { id: '2', name: 'Sit-ups', icon: 'body' },
    { id: '3', name: 'Finger Detection', icon: 'hand-left' },
  ];

  const handleCardPress = (id) => {
    setActiveChallenge(id);
  };

  const handleCameraAccess = async () => {
    Alert.alert(
      'Camera Access',
      'Allow this app to access your camera?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Allow',
          onPress: requestCameraPermission,
        },
      ],
      { cancelable: false }
    );
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setCameraPermission(true);
        connectToSocket();
      } else {
        Alert.alert('Permission Denied', 'Camera permission is required to start the challenge.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while requesting camera access.');
    }
  };

  const connectToSocket = () => {
    try {
      const newSocket = io('http://127.0.0.1:8000/ws/movementdetection/pushupmodel/');
      setSocket(newSocket);
      newSocket.on('connect', () => console.log('Connected to socket'));
      newSocket.on('disconnect', () => console.log('Disconnected from socket'));
    } catch (error) {
      Alert.alert('Connection Error', 'Failed to connect to the server.');
    }
  };

  const renderChallengeCard = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.challengeCard}
      onPress={() => handleCardPress(item.id)}
    >
      <Ionicons name={item.icon} size={32} color="#bb86fc" />
      <Text style={styles.challengeName}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (activeChallenge) {
    return (
      <View style={styles.fullScreenContainer}>
        <LinearGradient
          colors={['#1600BF', '#121212']}
          style={styles.gradientOverlay}
          start={[0, 0]}
          end={[0, 1]}
        />
        <View style={styles.challengeContentContainer}>
          <View style={styles.challengeContentInner}>
            {cameraPermission ? (
              <Camera
                style={{ width: '100%', height: '100%' }}
                ref={(ref) => setCameraRef(ref)}
                onMountError={() =>
                  Alert.alert('Error', 'Failed to access the camera. Please try again.')
                }
              />
            ) : (
              <Image
                source={{
                  uri: 'https://media.istockphoto.com/id/1703037118/sv/foto/6-year-old-boy-doing-sports-training-on-the-playground.jpg?s=612x612&w=0&k=20&c=b1iADrl9mi9eZgpPFxdqTWeaDiVN7T1ixseJ0XSVtaM=',
                }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>
          <TouchableOpacity style={styles.startButton} onPress={handleCameraAccess}>
            <View style={styles.startButtonCircle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollBackground}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#1600BF', '#121212']}
        style={styles.gradient}
        start={[0, 0]}
        end={[0, 1]}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Physical Challenges</Text>
        <View style={styles.cardContainer}>{challenges.map(renderChallengeCard)}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: {
    flex: 1,
    backgroundColor: '#1600BF',
  },
  gradient: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 200,
    backgroundColor: '#121212',
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#bb86fc',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  challengeCard: {
    backgroundColor: '#1e1e1e',
    width: '48%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  challengeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bb86fc',
    marginTop: 10,
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  challengeContentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 2,
  },
  challengeContentInner: {
    width: '95%',
    height: '70%',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  startButton: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  startButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
});
