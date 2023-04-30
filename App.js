import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import useNavigation from 'use-navigation';
// contexts
import { AuthContext } from './contexts/AuthContext'
import { ItemContext } from './contexts/ItemContext';
import { FBAuthContext } from './contexts/FBAuthContext';
import { DBContext } from './contexts/DBcontext';
// screens
import { HomeScreen } from './screens/HomeScreen';
import { SignUpScreen } from './screens/SignUp';
import { SignInScreen } from './screens/SignIn';
import { AddItemScreen } from './screens/AddItem';
import { TabScreen } from './screens/TabScreen';
import { EditScreen } from './screens/EditItem';


// firebase modules
import { firebaseConfig } from './config/Config';
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword
} from "firebase/auth"

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'





const Stack = createNativeStackNavigator();


const FBapp = initializeApp(firebaseConfig)
const FBauth = getAuth(FBapp)
const FBdb = getFirestore(FBapp)

export default function App() {
  const [auth, setAuth] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [itemData, setItemData] = useState([])

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
    if (itemData.length === 0 && auth) {
      GetData()
    }
  })

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignIn = (email, password) => {
    signInWithEmailAndPassword(FBauth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }
  const SignOut = () => {
    signOut(FBauth)
      .then(() => {
        //now the user is signed out
      })
      .catch((err) => console.log(error))
  }

  // const AdditemScreen = () => {
  //   navigation.navigate('AddItem');
  //   navigation.push('AddItem');
  // }


  // const EditItemScreenNav = () => {
  //   navigation.navigate('EditItem');
  //   navigation.push('AddItem');
  // }



  const AddData = async (note) => {
    const userId = auth.uid
    const path = `users/${userId}/items`
    // const data = { id: new Date().getTime(), description: "sample data"}
    const ref = await addDoc(collection(FBdb, path), item)
  }

  const GetData = () => {
    const userId = auth.uid
    const path = `users/${userId}/items`
    const dataQuery = query(collection(FBdb, path))
    const unsubscribe = onSnapshot(dataQuery, (responseData) => {
      let items = []
      responseData.forEach((items) => {
        let item = item.data()
        item.id = item.id
        items.push(item)
      })
      //console.log(items)
      setItemData(items)
    })
  }




  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup">
          {(props) => <SignUpScreen {...props} handler={SignUp} authStatus={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Signin">
          {(props) => <SignInScreen {...props} handler={SignIn} authStatus={auth} />}
        </Stack.Screen>

        <Stack.Screen name="AddItem">
          {(props) => <AddItemScreen {...props} handler={AdditemScreen} authStatus={auth} />}
        </Stack.Screen>
        <Stack.Screen name="EditItem">
          {(props) => <EditScreen {...props} handler={EditItemScreenNav} authStatus={auth} />}
        </Stack.Screen> 
          <Stack.Screen name="Home" options={{ headerRight: () => <SignOutButton title="signout" /> }}>
          {(props) => <HomeScreen {...props} authStatus={auth} add={AddData} data={noteData} />}

        </Stack.Screen>


        {/* <Stack.Screen name="Signup">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignUpScreen {...props} handler={SignUp} />
            </AuthContext.Provider>
          }
        </Stack.Screen>

        <Stack.Screen name="Signin">
          {(props) =>
            <AuthContext.Provider value={auth}>
              <SignInScreen {...props} handler={SignIn} />
            </AuthContext.Provider>
          }
        </Stack.Screen>

        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) =>
            <FBAuthContext.Provider value={FBauth} >
              <DBContext.Provider value={FBdb} >
                <AuthContext.Provider value={auth}>
                  <ItemContext.Provider value={itemData}>
                    <TabScreen {...props} />
                  </ItemContext.Provider>
                </AuthContext.Provider>
              </DBContext.Provider>
            </FBAuthContext.Provider>
          }
        </Stack.Screen>

        <Stack.Screen name="EditItem">
          {(props) =>
            <DBContext.Provider value={FBdb}>
              <AuthContext.Provider value={auth}>
                <EditScreen {...props} />
              </AuthContext.Provider>
            </DBContext.Provider>
          }
        </Stack.Screen> */}

       
      </Stack.Navigator>
    </NavigationContainer >
  );
}



// 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SignoutButtonPosition: {
    marginRight: 20,
  },

});