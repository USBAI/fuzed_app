import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LevelsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={[styles.scrollBackground, refreshing && styles.refreshBackground]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#FFFFFF"
          colors={['#FFFFFF']}
          progressViewOffset={20}
        />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={["blue", "#121212"]}
        style={styles.gradient}
        start={[0, 0]}
        end={[0, 1]}
      />
      <View style={styles.content}>
        <Text style={styles.text}>Nothing to see here</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: {
    flex: 1,
    backgroundColor: 'blue',
  },
  refreshBackground: {
    backgroundColor: 'blue',
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    width: '100%',
    height: '100%',
    minHeight: '100%',
  },
  text: {
    color: '#bb86fc',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
