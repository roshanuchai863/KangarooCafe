
import { View, Text } from 'react-native'
import { SignOutButton } from '../components/SignOutButton'

export function ProfileScreen () {
 
  return (
    <View>
      <Text>User Profile</Text>
      <SignOutButton style={styles.separator}  text = "Sign out" />
    </View>
  )
  
  const styles = StyleSheet.create({
    text: {
      justifyContent: "bottom center",
  },
  })
}