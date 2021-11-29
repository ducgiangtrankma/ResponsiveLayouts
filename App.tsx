/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import {useOrientation} from './src/hooks';
interface AppProps {}

const App: FC<AppProps> = ({}) => {
  const orientation = useOrientation();
  const [isSelected, setSelected] = useState<boolean>(false);
  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.item}>
        <Text style={{color: '#FFFFFF'}}>{item.key}</Text>
      </View>
    );
  }, []);
  const renderDivider = useCallback(() => {
    return <View style={styles.divider} />;
  }, []);

  const radioAnimated = useRef(new Animated.Value(0)).current;
  const circleColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: ['gray', 'green'],
  });
  const lineColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: ['gray', 'green'],
  });
  useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected]);
  return (
    <SafeAreaView
      style={[
        styles.container,

        {flexDirection: orientation.isPortrait ? 'column' : 'row'},
      ]}>
      <View
        style={[
          styles.buttonContainer,
          {
            flexDirection: orientation.isPortrait ? 'row' : 'column',
            justifyContent: orientation.isPortrait ? 'space-around' : 'center',
          },
        ]}>
        <TouchableOpacity style={styles.button}>
          <Text>Button1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text>Button2</Text>
        </TouchableOpacity>
      </View>
      {!orientation.isPortrait ? (
        <View style={{backgroundColor: '#FFFFFF', height: '100%', width: 2}} />
      ) : null}
      <FlatList
        data={[
          {key: 'C'},
          {key: 'C++'},
          {key: 'Java'},
          {key: 'C#'},
          {key: 'Javascript'},
          {key: 'Ruby'},
          {key: 'Python'},
          {key: 'Golang'},
        ]}
        ItemSeparatorComponent={renderDivider}
        renderItem={renderItem}
      />
      <TouchableOpacity
        onPress={() => setSelected(!isSelected)}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            width: 40,
            height: 3,
            backgroundColor: lineColor,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            left: radioAnimated,
            width: 25,
            height: 25,
            borderRadius: 15,
            backgroundColor: '#ffffff',
            borderColor: circleColor,
            borderWidth: 3,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    height: 60,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});
export default App;
