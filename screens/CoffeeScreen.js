import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, Pressable } from 'react-native'
import { useContext, useState } from 'react'


export function CoffeeScreen( props ) {
    const [showModal, setShowModal] = useState(false)
    const [itemName, setItemName] = useState('')
    const [itemDesc,setItemDesc] = useState('')
  
    const saveItem = () => {
      setShowModal( false )
      const itemObj = { itemName: itemName, itemDesc: itemDesc }
      props.add( itemObj )
    }
    
    return (
      <View style={styles.screen}>
        <Text>Home Screen</Text>
        {/* modal element */}
        <Modal
          transparent={false}
          animationType="slide"
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.modalLabel}>Name</Text>
            <TextInput 
              style={styles.modalInput} 
              value={ itemName } 
              onChangeText={ (val) => setItemName(val)}
            />
            <Text style={styles.modalLabel} >Item</Text>
            <TextInput 
              multiline={true} 
              style={styles.modalInput2} 
              value={ item }
              onChangeText={ (val) => setItem(val) }
            />
            <View style={ styles.buttonsRow }>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.buttonText} >Close</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={ styles.addButton }
                onPress={ () => saveItem() }
              >
                <Text style={ styles.buttonText }>Save</Text>
              </TouchableOpacity>
            </View>
  
          </View>
        </Modal>
        {/* button to open modal */}
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)} >
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const styles = StyleSheet.create({
    screen: {
      justifyContent: "center",
    },
    modal: {
      padding: 10,
      paddingTop: 50,
      flex: 1,
      justifyContent: "start",
      margin: 20,
      backgroundColor: "lightblue",
    },
    modalInput: {
      fontSize: 18,
      backgroundColor: "#ffffff",
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
      padding: 5,
      flex: 1,
    },
    addButton: {
      padding: 5,
      backgroundColor: "green",
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
    }
  })