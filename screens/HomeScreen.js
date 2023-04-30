import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from 'react'
import * as SignOutButton from "../components/SignOutButton";
import React from 'react'
import { getAuth, query, onSnapshot } from "firebase/auth";
//import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext"
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { ListItem } from "../components/ListItem"
import IonIcons from '@expo/vector-icons/Ionicons'
import { DBContext } from "../contexts/DBcontext"
import { ListItemSeparator } from "../components/ListItemSeparator";
//import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
import { Image } from 'react-native';
import { ItemContext } from "../contexts/ItemContext";
// firebase modules
import { firebaseConfig } from "../config/Config";
import {

    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth"

import { initializeApp } from 'firebase/app';



export function HomeScreen(props) {
    const navigation = useNavigation()
    const authStatus = useContext(AuthContext)
    const Item = useContext(ItemContext)
    const DB = useContext(DBContext)

    const FBapp = initializeApp(firebaseConfig);
    const FBauth = getAuth(FBapp)
    const FBdb = getFirestore(FBapp)


    const [showModal, setShowModal] = useState(false)
    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [image, setImage] = useState("");
    const [Datainfo, setDatainfo] = useState([]);
    const [auth, setAuth] = useState()


    onAuthStateChanged(FBauth, (user) => {
        if (user) {
            setAuth(user)
            // console.log( user.uid )
        }
        else {
            setAuth(null)
        }
    })

    useEffect(() => {
        if (Datainfo.length === 0 && auth) {
            GetData()
        }
    })

    const GetData = () => {
        const userId = auth.uid
        console.log("wrong user" + userId)
        const path = `users/${userId}/coffee`
        const dataQuery = query(collection(FBdb, path))
        const unsubscribe = onSnapshot(dataQuery, (responseData) => {
            let notes = []
            responseData.forEach((note) => {
                let item = note.data()
                item.id = note.id
                notes.push(item)

            })
            console.log(userId)
            setDatainfo(Datainfo)
        })
    }

    useEffect(() => {
        const userId = auth.uid
        console.log("wrong user" + userId)
        // GetData()
    }, [])



    useEffect(() => {
        if (!authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [authStatus])

    const ListClickHandler = (data) => {
        navigation.navigate("EditItem", data)
    }



    const Additemscreen = () => {
        navigation.navigate('AddItem');
        // navigation.push('AddItem');
    }

    const editItemScreen = () => {
        navigation.navigate('EditItem');
        // navigation.push('EditItem');
    }


    return (
        <View style={styles.screen} >
            {/* modal element */}
            <Text style={styles.mainfont}>Kangaroo Cafe!</Text>

            {/* button to open modal */}
            <TouchableOpacity style={styles.button} onPress={() => Additemscreen(true)} >
                <IonIcons name="add-outline" size={28} color="white" />
            </TouchableOpacity>
            <FlatList
                data={Item}
                renderItem={({ item }) => (
                    <ListItem
                        id={item.id}
                        itemName={item.itemName}
                        itemPrice={item.itemPrice}
                        itemDesc={item.itemDesc}
                        image={item.image}
                        handler={ListClickHandler}
                    />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ListItemSeparator}

            />

            <SignOutButton.SignOutButton text="Sign out" />
            < TouchableOpacity
                onPress={() => Additemscreen()}
            >
                <Text>Add Item</Text>


            </TouchableOpacity>


            < TouchableOpacity
                onPress={() => ListClickHandler()}
            >
                <Text>Edit Item</Text>


            </TouchableOpacity>
            <View sytle={styles.modal}>
                <TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={{ width: 300, height: 260, margin: 20 }} />}</TouchableOpacity>
                <Text sytle={styles.titleName}>{itemName}</Text>
                <Text sytle={styles.titleName}>{itemDesc}</Text>
                <Text sytle={styles.titleName}>{itemPrice}</Text>
            </View>
        </View >





    )
}

const styles = StyleSheet.create({
    screen: {

        marginRight: 60,
        marginLeft: 60,
        marginTop: 30,
        alignContent: "center",
        textAlign: 'center'


    },
    modal: {
        padding: 10,
        paddingTop: 50,
        flex: 1,
        justifyContent: "start",
        margin: 20,
        backgroundColor: "lightblue",
    },
    mainfont: {
        fontSize: 30,
        color: "#ff0000",
        textAlign: "center",
    },
    modalInput: {
        fontSize: 18,
        color: "#ff0000",
        textAlign: "left",
        paddingLeft: 150,
    },
    productPosition: {
        minHeight: 80,
        fontSize: 18,
        backgroundColor: "#ffffff",
    },
    modalLabel: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#000000",
        padding: 10,
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 999,
    },
    addButton: {
        padding: 5,
        backgroundColor: "green",
        flex: 1,
    },
    closeButton: {
        backgroundColor: "#000000",
        padding: 10,
        flex: 1,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 12,
        textAlign: "center",
    },
    buttonsRow: {
        flexDirection: "row",
        marginVertical: 10,
    },
    listItem: {
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
})