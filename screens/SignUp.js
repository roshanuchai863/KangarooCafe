import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";

export function SignUpScreen(props) {
    const [email, setEmail] = useState("")
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState("")
    const [validPassword, setValidPassword] = useState(false)
    const [validForm, setValidForm] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        if (email.indexOf('@') > 0) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    }, [email])

    useEffect(() => {
        if (password.length >= 8) {
            setValidPassword(true)
        }
        else {
            setValidPassword(false)
        }
    }, [password])

    useEffect(() => {
        if (validEmail && validPassword) {
            setValidForm(true)
        }
        else {
            setValidForm(false)
        }
    })

    useEffect(() => {
        if (props.authStatus) {
            // navigate adds a back arrow to the header
            // navigation.navigate("Home")
            // reset will make "Home" the root page of the navigation
            navigation.reset({ index: 0, routes: [{ name: "Home" }] })
        }
    }, [props.authStatus])

    return (
        <View style={styles.page}>
            <Text style={styles.title}>Sign up for an account</Text>
            <View style={styles.inputGroup}>
                <Text>Email address</Text>
                <TextInput
                    style={(validEmail) ? styles.validInput : styles.input}
                    placeholder="you@domain.com"
                    value={email}
                    onChangeText={(emailText) => setEmail(emailText)}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Password</Text>
                <TextInput
                    style={(validPassword) ? styles.validInput : styles.input}
                    placeholder="minimum 8 characters"
                    value={password}
                    onChangeText={(pwText) => setPassword(pwText)}
                    secureTextEntry={true}
                />
            </View>
            <TouchableOpacity
                style={(validForm) ? styles.button : styles.buttonDisabled}
                disabled={(validForm) ? false : true}
                onPress={() => props.handler(email, password)}
            >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signInLink}
                onPress={() => navigation.navigate("Signin")}
            >
                <Text style={styles.signInLinkText}>Already have an account? Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        marginHorizontal: 60,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    input: {
        backgroundColor: "#ffffff",
        padding: 5,
        borderWidth: 1,
        borderColor: "#cccccc",
    },
    validInput: {
        borderColor: "D3D3D3",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        padding: 5,
    },
    inputGroup: {
        marginVertical: 5,
    },
    button: {
        backgroundColor: "#000000",
        padding: 10,
        marginVertical: 10,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center"
    },
    buttonDisabled: {
        backgroundColor: "#D3D3D3",
        padding: 10,
        marginVertical: 10,
    },
    signInLink: {
        marginVertical: 5,
    },
    signInLinkText: {
        textAlign: "center",
    }

})
})