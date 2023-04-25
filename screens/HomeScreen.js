import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from 'react'
import * as SignOutButton from "../components/SignOutButton";
import React from 'react'
//import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext"
import { ItemContext } from "../contexts/ItemContext"
import { addDoc, collection } from "firebase/firestore"
import { ListItem } from "../components/ListItem"
import IonIcons from '@expo/vector-icons/Ionicons'
import { DBContext } from "../contexts/DBcontext"
import { ListItemSeparator } from "../components/ListItemSeparator";
//import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";


export function HomeScreen(props) {
    const navigation = useNavigation()
    const authStatus = useContext(AuthContext)
    const Item = useContext(ItemContext)
    const DB = useContext(DBContext)

    const [showModal, setShowModal] = useState(false)
    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [image, setImage] = useState("");

    const saveItem = async () => {
        setShowModal(false)
        const itemObj = { title: itemName, content: item }
        // add item to firebase
        const path = `users/{authStatus.uid}/item`
        const ref = await addDoc(collection(DB, path), itemObj)
        setItemName(``)
        setImage(``)
        setItemPrice(``)
    }

    

    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus])

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
            <Text style={styles.mainfont}>WELCOME!</Text>
            <Modal
                transparent={false}
                animationType="slide"
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalLabel}>Item</Text>
                    <TextInput
                        style={styles.modalInput}
                        value={itemName}
                        onChangeText={(val) => setItemName(val)}
                    />
                    <Text style={styles.modalLabel} >Description</Text>
                    <TextInput
                        multiline={true}
                        style={styles.modalInput2}
                        value={itemDesc}
                        onChangeText={(val) => setItemDesc(val)}
                    />
                    <View style={styles.buttonsRow}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowModal(false)}
                        >
                            <Text style={styles.buttonText} >Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => Additemscreen()}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
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
                        name={item.itemPrice}
                        //itemDesc={item.itemDesc}
                        //image={item.image}
                        handler={ListClickHandler}
                    />
                )}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={ListItemSeparator}
            />

            {/* <SignOutButton.SignOutButton text="Sign out" />
            < TouchableOpacity
                onPress={() => Additemscreen()}
            >
                <Text>Add Item</Text>


            </TouchableOpacity>


            < TouchableOpacity
                onPress={() => editItemScreen()}
            >
                <Text>Edit Item</Text>


            </TouchableOpacity> */}

        </View >



    )
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        position: "relative",
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
    modalInput2: {
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
