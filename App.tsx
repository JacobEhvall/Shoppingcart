import React, { useEffect,useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Image} from 'react-native';
import { NavigationContainer,useNavigation,useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

interface Item {title:string;
image:string; price:number; id:number; description:string}

const NetworkData = () => {
  const [data, setData] = useState <Item[]>([])
  const navigation = useNavigation()

const fetchData = () => {
  fetch('https://fakestoreapi.com/products')
  .then((response)=> response.json())
  .then((json) => {
    let dataResults:Item[] = []
    json.forEach((item:Item) => {
    let results = {title: item.title, id: item.id, price: item.price, image: item.image, description: item.description}
    dataResults.push(results)
  })
  setData(dataResults)
})}
useEffect(() => { fetchData()  

},[])
return(
  <SafeAreaView>
<FlatList
  data={data}
 renderItem={({ item }) => (
<TouchableOpacity onPress={()=> navigation.navigate("ProductInfo", {item})}>
<Text style={{fontWeight:'bold'}}>{item.title}</Text>
<Text>{item.price}</Text>
<Image style={{width:90,height:90,margin:15}}source={{uri:item.image}}/>
</TouchableOpacity>
)}
  keyExtractor = {item => item.id.toString()} 
/>
</SafeAreaView>
)}

const Catalog = () => {
  return(
    <View style={styles.container}>
      <NetworkData/>
    </View>
  )
}

const ProductInfo = () => {
const route = useRoute()
const {item} = route.params

  return(
    <View style={styles.container}>
      <Text style={{fontWeight:'bold'}}>{item.title}</Text>
      <Text>{item.price}</Text>
      <Text>{item.description}</Text>
      <Image style={{width:90,height:90,margin:15}}source={{uri:item.image}}/>
    </View>
  )
}

const CatalogTitile = () => {
const Stack = createStackNavigator()

  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Catalog" component={Catalog}/>
      <Stack.Screen name="ProductInfo" component={ProductInfo}/>              
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {

  return( 
    <CatalogTitile/>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
}); 
