// import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Button } from "react-native"
// import { useNavigation } from "@react-navigation/native";
// import { useState, useEffect } from 'react'
// import * as SignOutButton from "../components/SignOutButton";
// import React from 'react'
// import { getAuth, signOut } from "firebase/auth";


// export function HomeScreen(props) {
//     const navigation = useNavigation()





//     const [showModal, setShowModal] = useState(false)
//     const [title, setTitle] = useState('')
//     const [note, setNote] = useState('')

//     const saveNote = () => {
//         setShowModal(false)
//         const noteObj = { title: title, content: note }
//         props.add(noteObj)
//     }

//     useEffect(() => {
//         if (!props.authStatus) {
//             navigation.reset({ index: 0, routes: [{ name: "Signin" }] })
//         }
//     }, [props.authStatus])

//     const ListClickHandler = (data) => {
//         navigation.navigate("Detail", data)
//     }

//     const ListItem = (props) => {
//         return (
//             // <View
//             //     style={styles.listItem}

//             // >
//             //     <TouchableOpacity onPress={
//             //         () => ListClickHandler({ id: props.id, title: props.title, content: props.content })
//             //     }
//             //     >
//             //         <Text>
//             //             {props.title}
//             //         </Text>
//             //     </TouchableOpacity>
//             //     <Text>{props.content}</Text>
//             // </View>

//             <View style={styles.screen} >
//                 {/* modal element */}
//                 <Text style={styles.mainfont}>WELCOME!</Text>
//                 <Modal
//                     transparent={false}
//                     animationType="slide"
//                     visible={showModal}
//                     onRequestClose={() => setShowModal(false)}
//                 >
//                     <View style={styles.modal}>
//                         <Text style={styles.modalLabel}>Item</Text>
//                         <TextInput
//                             style={styles.modalInput}
//                             value={itemName}
//                             onChangeText={(val) => setItemName(val)}
//                         />
//                         <Text style={styles.modalLabel} >Description</Text>
//                         <TextInput
//                             multiline={true}
//                             style={styles.modalInput2}
//                             value={itemDesc}
//                             onChangeText={(val) => setItemDesc(val)}
//                         />
//                         <View style={styles.buttonsRow}>
//                             <TouchableOpacity
//                                 style={styles.closeButton}
//                                 onPress={() => setShowModal(false)}
//                             >
//                                 <Text style={styles.buttonText} >Close</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity
//                                 style={styles.addButton}
//                                 onPress={() => Additemscreen()}
//                             >
//                                 <Text style={styles.buttonText}>Save</Text>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                 </Modal>
//                 {/* button to open modal */}
//                 <TouchableOpacity style={styles.button} onPress={() => Additemscreen(true)} >
//                     <IonIcons name="add-outline" size={28} color="white" />
//                 </TouchableOpacity>
//                 <FlatList
//                     data={Item}
//                     renderItem={({ item }) => (
//                         <ListItem
//                             id={item.id}
//                             itemName={item.itemName}
//                             name={item.itemPrice}
//                             //itemDesc={item.itemDesc}
//                             //image={item.image}
//                             handler={ListClickHandler}
//                         />
//                     )}
//                     keyExtractor={item => item.id}
//                     ItemSeparatorComponent={ListItemSeparator}
//                 />

//                 <SignOutButton.SignOutButton text="Sign out" />
//                 < TouchableOpacity
//                     onPress={() => Additemscreen()}
//                 >
//                     <Text>Add Item</Text>


//                 </TouchableOpacity>


//                 < TouchableOpacity
//                     onPress={() => editItemScreen()}
//                 >
//                     <Text>Edit Item</Text>


//                 </TouchableOpacity>

//             </View >


//         )
//     }

//     const ListItemSeparator = (props) => {
//         return (
//             <View style={styles.separator} ></View>
//         )
//     }



//     const Additemscreen = () => {
//         navigation.navigate('AddItem');
//         // navigation.push('AddItem');
//     }

//     const editItemScreen = () => {
//         navigation.navigate('EditItem');
//         // navigation.push('EditItem');
//     }

//     return (



//         <View style={styles.screen} >
//             <Text style={styles.mainfont}>Work in progress......</Text>

//             <SignOutButton.SignOutButton text="Sign out" />
//             < TouchableOpacity
//                 onPress={() => Additemscreen()}
//             >
//                 <Text>Add Item</Text>


//             </TouchableOpacity>


//             < TouchableOpacity
//                 onPress={() => editItemScreen()}
//             >
//                 <Text>Edit Item</Text>


//             </TouchableOpacity>


//         </View >



//     )
// }

// const styles = StyleSheet.create({
//     screen: {
//         justifyContent: "center",
//     },
//     modal: {
//         padding: 10,
//         paddingTop: 50,
//         flex: 1,
//         justifyContent: "start",
//         margin: 20,
//         backgroundColor: "lightblue",
//     },
//     mainfont: {
//         fontSize: 50,
//         color: "#ff0000",
//         textAlign: "center",
//     },
//     modalInput: {
//         fontSize: 18,
//         color: "#ff0000",
//         textAlign: "left",
//         paddingLeft: 150,
//     },
//     modalInput2: {
//         minHeight: 80,
//         fontSize: 18,
//         backgroundColor: "#ffffff",
//     },
//     modalLabel: {
//         fontSize: 20,
//         marginBottom: 10,
//     },
//     button: {
//         backgroundColor: "#000000",
//         padding: 5,
//         flex: 1,
//     },
//     addButton: {
//         padding: 5,
//         backgroundColor: "green",
//         flex: 1,
//     },
//     buttonText: {
//         color: "#ffffff",
//         fontSize: 12,
//         textAlign: "center",
//     },
//     buttonsRow: {
//         flexDirection: "row",
//         marginVertical: 10,
//     },
//     listItem: {
//         padding: 10,
//         flexDirection: "row",
//         justifyContent: "space-between"
//     },
//     separator: {
//         backgroundColor: '#CCCCCC',
//         height: 2,
//     }
// })


import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Button } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from 'react'
import * as SignOutButton from "../components/SignOutButton";
import React from 'react'
//import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext"
import { ItemContext } from "../contexts/ItemContext"
import { addDoc, getDocs, collection } from "firebase/firestore"
import { ListItem } from "../components/ListItem"
import IonIcons from '@expo/vector-icons/Ionicons'
import { DBContext } from "../contexts/DBcontext"
import { ListItemSeparator } from "../components/ListItemSeparator";
//import { Item } from "react-native-paper/lib/typescript/src/components/Drawer/Drawer";
import { db } from "../config/Config";
import { Image } from 'react-native';

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
        const itemObj = { title: itemName, content: Item }
        // add item to firebase
        const path = `users/{authStatus.uid}/item`
        const ref = await addDoc(collection(DB, path), itemObj)
        setItemName(``)
        setImage(``)
        setItemPrice(``)
    }

    // //read data from database
    // useEffect(() => {
    //     const readData = async () => {
    //         const docRef = doc(db, "coffee", "xWrwUXqb9IU25TIRRQ27");
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             setImage(docSnap.data().ImageUrl);
    //             console.log("iamge location:" + (docSnap.data().imageUrl))
    //             setItemName(docSnap.data().productTitle);
    //             setItemDesc(docSnap.data().productDesc);
    //             setItemPrice(docSnap.data().productPrice);


    //             console.log(docSnap.data())

    //         }
    //     }
    //     readData();
    // }, [])

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
    const readDataFile = () => {
        const colRef = collection(db, 'coffee')
        getDocs(colRef).then((snapshot) => {
            let datafile = []
            snapshot.docs.forEach((doc) => {
                datafile.push({ ...doc.data(), id: doc.id })
                setImage(doc.data().ImageUrl)
                setItemName(doc.data().productTitle)
                setItemDesc(doc.data().productDesc)
                setItemPrice(doc.data().productPrice)
            })


            console.log(userid);
        }).catch(err => {
            console.log(err.message)

        })
    }

    useEffect(() => {
        readDataFile();
    }, []);
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

             <SignOutButton.SignOutButton text="Sign out" />
            < TouchableOpacity
                onPress={() => Additemscreen()}
            >
                <Text>Add Item</Text>


            </TouchableOpacity>


            < TouchableOpacity
                onPress={() => editItemScreen()}
            >
                <Text>Edit Item</Text>


            </TouchableOpacity>


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

