import { View, Text, Pressable, StyleSheet } from 'react-native'
export function ListItem(props) {
    const data = {
        id: props.id,
        itemName: props.itemName,
        itemPrice: props.itemPrice
    }
    return (
        <Pressable onPress={ () => props.handler( data ) }>
            <View style={ styles.item }>
                <Text style={ styles.item }>{ props.itemName }</Text>

            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 18,
    }
})
const styles = StyleSheet.create({
    item: {
        padding: 10,
    },
    itemText: {
        fontSize: 18,
    },
   

})