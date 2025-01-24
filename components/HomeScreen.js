import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, RefreshControl, ScrollView, Vibration } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { G, Path, ClipPath, Rect, Defs } from 'react-native-svg';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Vibration.vibrate(50);
    }, 2000);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FFFFFF"
          colors={["#FFFFFF"]}
          progressViewOffset={20}
          style={styles.refreshControl}
        />
      }
      style={styles.scrollBackground}
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={["#6B01D4", "#121212"]}
        style={styles.gradient}
        start={[0, 0]}
        end={[0, 1]}
      >
        <Svg width="73" height="30" viewBox="0 0 93 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Defs>
            <ClipPath id="clip0">
              <Rect width="93" height="30" fill="white" />
            </ClipPath>
          </Defs>
          <G clipPath="url(#clip0)">
            <Path d="M9.95482 8.61703L5.6084 5.14056V29.8235H9.95482V18.7982H26.6682V15.4953H9.95482V8.61703ZM21.4802 11.0506H11.217V14.3529H25.5463L21.4802 11.0506ZM27.1452 23.9382V26.8435L30.0335 29.1282V26.2223L27.1452 23.9382Z" fill="white" />
            <Path d="M46.662 4.4447L42.9048 7.74764H10.8238L6.67334 4.4447H46.662Z" fill="white" />
            <Path d="M56.8144 2.08588L30.791 25.3035L27.7904 22.92L49.7191 3.32765H4.34642V29.1029L0 25.6765V0H54.2622L56.8144 2.08588ZM66.1522 20.9588H70.4986V8.59118L66.1522 5.11471V20.9588Z" fill="white" />
            <Path d="M92.3444 14.9241C92.3444 23.9629 85.2491 29.7988 75.0417 29.7988H31.3237V26.4959L57.2349 3.40174V8.49292L37.016 26.5206H73.836C82.5574 26.5206 88.0258 21.7782 88.0258 14.8994C88.0258 8.02115 82.6976 3.32762 73.836 3.32762H64.9187V22.1006H73.836C79.248 22.1006 82.4173 19.3194 82.4173 14.8994C82.4173 10.4794 79.248 7.74762 73.836 7.74762H71.3961L67.2463 4.44527H73.836C81.9961 4.44527 86.7637 8.74115 86.7637 14.8994C86.7637 21.0582 81.8559 25.4035 73.836 25.4035H40.1288L43.8023 22.1006H60.5722V0.0252686H74.0606C85.8662 0.0252686 92.3444 5.88527 92.3444 14.9488V14.9241Z" fill="white" />
          </G>
        </Svg>

        <View style={styles.stepsContainer}>
          <MaterialIcons name="directions-walk" size={14} color="#FFFFFF" />
          <Text style={styles.stepsText}>0 Steps</Text>
        </View>
      </LinearGradient>
      <View style={styles.contant}>
        <Text style={styles.text}>Under Development :( 🚧</Text>
        <View style={styles.loadingContainer}>
          {/* <View style={styles.loadingBox}></View> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollBackground: {
    flex: 1,
    backgroundColor: '#6B01D4',
  },
  refreshControl: {
    backgroundColor: '#6B01D4',
  },
  gradient: {
    width: '100%',
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 40,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(208, 208, 208, 0.34)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  contant: {
    alignItems: 'center',
    backgroundColor: '#121212',
    width: '100%',
    minHeight: '100%',
  },
  stepsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  text: {
    color: '#bb86fc',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 220,
  },
  loadingContainer: {
    marginTop: 30,
    width: '90%',
    alignItems: 'center',
  },
  loadingBox: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#1e1e1e',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shinyBox: {
    backgroundColor: 'linear-gradient(to right, #ffffff, #ffc0cb, #ffffff)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite linear',
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-200% 0',
    },
    '100%': {
      backgroundPosition: '200% 0',
    },
  },
});
