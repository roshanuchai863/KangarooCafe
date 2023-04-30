import React, { useState, useEffect, Alert } from 'react';
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig, db } from '../config/Config';
import { getStorage, uploadBytesResumable } from "firebase/storage";
import { Image } from 'react-native';
import { ref, onValue } from "firebase/database";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
} from 'react-native';
import { updateDoc, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';


// import database from '@react-native-firebase/database';




export function EditScreen(props) {
    initializeApp(firebaseConfig);


    // getting user status and sending image to that specific user id
    const auth = getAuth();
    const user = auth.currentUser;

    const storage = getStorage();

    // settion input fields
    const navigation = useNavigation()
    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")


    // storing firebase data into variable
    // productTitle: itemName,
    // productDesc: itemDesc,
    // productPrice: itemPrice,
    const [image, setImage] = useState(null)






    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus]);






    const cancelHandler = () => {
        navigation.navigate("Home");
    }

    // update function
    const udpdatename = () => {
        updateDoc(doc(db, "coffee", "Udl92Hq8ASkUHyQ1P339"), {

            productTitle: itemName,
            productDesc: itemDesc,
            productPrice: itemPrice,
            // readData()

        });

        console.log("success")

    }

    const deleteData = () => {
        deleteDoc(doc(db, "coffee", "Udl92Hq8ASkUHyQ1P339"));
        console.log("deleted Successfully")
        setItemDesc("");
        setItemName("");
        setItemPrice("");
        setImage("");
        Alert.alert("Deleted Successfully")

        navigation.navigate("Home");
    }




    //on openscreen display datainto input field
    useEffect(() => {
        const readData = async () => {
            const docRef = doc(db, "coffee", "Udl92Hq8ASkUHyQ1P339");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setImage(docSnap.data().ImageUrl);
                console.log("iamge location:" + (docSnap.data().imageUrl))
                setItemName(docSnap.data().productTitle);
                setItemDesc(docSnap.data().productDesc);
                setItemPrice(docSnap.data().productPrice);


                console.log(docSnap.data())

            }
        }
        readData();
    }, [])


    return (


        <View style={styles.page}>


            {/* 
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
               
            </View> */}


            {/* <View>

                <Button title='upload Image' onPress={uploadImage} />

            </View> */}


            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Add item</Text>

                <TextInput
                    style={styles.input}
                    placeholder="item name"
                    value={itemName}
                    onChangeText={(setItemNames) => setItemName(setItemNames)}
                >
                </TextInput>
            </View>





            {/* description */}
            <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Item Description</Text>
                <TextInput
                    style={styles.descriptionbox}
                    placeholder="item Description"
                    value={itemDesc}
                    onChangeText={(setItemDescs) => setItemDesc(setItemDescs)}
                >
                </TextInput>
            </View>


            {/* price */}
            <View sytle={styles.itemposition}>
                <Text sytle={styles.titleName}>Items Price</Text>
                <TextInput
                    style={styles.input}
                    placeholder="item Price"
                    value={itemPrice}
                    onChangeText={(setItemPrices) => setItemPrice(setItemPrices)}
                >
                </TextInput>

            </View>
            <View style={styles.container}>

                <Button title=" Delete " style={styles.buttonContainer} onPress={deleteData} />
                < Button title=" Update " style={styles.buttonContainer} onPress={udpdatename}
                />


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginRight: 60,
        marginLeft: 60,
        marginTop: 30,
        alignContent: "center",
    },

    input: {
        backgroundColor: "#ffffff",
        padding: 5,
        borderWidth: 1,
        marginTop: 10,
        borderColor: "#cccccc",
    },
    validInput: {
        borderColor: "green",
        borderWidth: 1,
        backgroundColor: "#ffffff",
        padding: 5,
    },
    inputGroup: {
        marginVertical: 5,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,

    },
    buttonContainer: {
        padding: 80,


    },



    itemposition:
    {
        alignContent: 'center',
        backgroundColor: "#000000",
        paddingTop: 20,
    },
    descriptionbox: {
        height: 100,
        backgroundColor: "#ffffff",
        padding: 5,
        paddingTop: 2,
        borderWidth: 1,
        borderColor: "#cccccc",
        marginTop: 10,

    },


    uploadBtn: {
        height: 50,
        marginTop: 20,
        color: "#cccccc",
    },
})