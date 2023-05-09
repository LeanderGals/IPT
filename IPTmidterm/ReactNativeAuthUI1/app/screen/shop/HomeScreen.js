import { View, Text, ImageBackground, StyleSheet} from 'react-native'
import React from 'react'

const image = {uri: 'https://images.hdqwalls.com/download/neon-world-7o-1366x768.jpg'}
const HomeScreen = () => {
  return (
    
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color:'white',justifyContent:'center', alignSelf:'center'}}>Hello World!</Text>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default HomeScreen