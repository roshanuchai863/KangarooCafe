import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import { useContext } from 'react'
import { FBAuthContext } from '../contexts/FBAuthContext'
import { signOut, getAuth } from 'firebase/auth'

export function SignOutButton(props) {
    const FBauth = useContext(FBAuthContext)


    //const auth = getAuth();

    const SignOutHandler = () => {
        signOut(FBauth).then(() => {
            // Sign-out successful.
            Alert.alert("sign Out Successful")

        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <View>
            <Pressable onPress={() => SignOutHandler()}>
                <Text>{props.text}</Text>

            </Pressable>
        </View>
    )
}