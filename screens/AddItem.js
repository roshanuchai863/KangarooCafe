import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import * as ImagePicker from 'expo-image-picker';
import { firebaseConfig, db, storage } from '../config/Config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from 'firebase/app';


import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert, Image,
} from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';



export function AddItemScreen(props) {
    initializeApp(firebaseConfig);



    // getting user status and sending image to that specific user id
    const auth = getAuth();
    const user = auth.currentUser;


    const navigation = useNavigation()
    const [itemName, setItemName] = useState("")
    const [itemDesc, setItemDesc] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [image, setImage] = useState("");



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            console.log("image location:" + image)
        }
    };


    // upload to firebase effect onclick or onpick select image
    useEffect(() => {
        const uploadImage = async () => {
            const blobImage = await new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request Failed"));
                }
                xhr.responseType = "blob";
                xhr.open("Get", image, true)
                xhr.send();
            })

            // Create the file metadata

            const metadata = {
                contentType: 'image/jpeg'
            };

            // Upload file and metadata to the object 'images/mountains.jpg'
            const storageRef = ref(storage, 'images/' + Date.now());
            const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');

                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        // ...

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImageUrl(downloadURL);
                        console.log("image source:" + imageUrl);
                    });
                }
            );

        }

        if (image != null) {
            uploadImage();
            //setImage(imageUrl)
        }
    }, [image]);



    useEffect(() => {
        if (!props.authStatus) {
            navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
        }
    }, [props.authStatus])



    const cancelHandler = () => {
        navigation.navigate("Home");
    }


    //read and write to fbdatabase
    const userinputs = async () => {
        // condition for empty input field
        if ((itemDesc && itemName && itemPrice).length < 1) {
            alert("Input field is empty")
        }
        else {
            const docRef = await addDoc(collection(db, "coffee"), {
                // ImageUrlLocation: storage,
                ImageUrl: imageUrl,
                productTitle: itemName,
                productDesc: itemDesc,
                productPrice: itemPrice,
            });
            alert("Data Added")
        }

        //resetting input fields
        setItemDesc("");
        setItemName("");
        setItemPrice("");
        setImage("");

        Alert.alert("Added ", "Successfully Added",)


    }


    return (

        <ScrollView style={styles.page}>
            <View >
                <View>

                    <Button title='Select Image' onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />}
                    {/* <ImagePreview visible={visible} source={{ uri: 'some-source' }} close={setVisibleToFalse} /> */}
                    {/* <Button title='Upload Image' onPress={uploadImage} /> */}

                </View>




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
                    <Button title=" Cancel " style={styles.buttonContainer} onPress={cancelHandler} />
                    <Button title=" add " style={styles.buttonContainer} onPress={userinputs} />

                </View>
                {/* // </View> */}
            </View >

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        marginRight: 60,
        marginLeft: 60,
        marginTop: 30,
        alignContent: "center",
        textAlign: 'center'

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
    uploadBtn: {
        height: 50,
        marginTop: 20,
        color: "#cccccc",
    },
})