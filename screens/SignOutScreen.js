import { View, Text } from "react-native";

export function SignOutScreen(props) {
    return (
        <View>
            <Text>Sign out</Text>
            onPress={() => navigation.navigate("SignIn")}
        </View>
    )
}