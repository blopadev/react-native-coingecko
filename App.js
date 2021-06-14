import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'

import CoinItem from "./components/CoinItem";

const App = () => {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    const data = await res.json()
    setCoins(data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={styles.container} >
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header} >
        <Text style={styles.title} >CryptoMarket</Text>
        <TextInput style={styles.searchInput}
          placeholder="Search a coin"
          placeholderTextColor="#858585"
          //onChangeText={text => console.log(text)}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coins.filter(
            coin =>
              coin.name.toLowerCase().includes(search) ||
              coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false} // así ocultamos la barra de scroll, es un móvil, no se necesita
        //refreshing={true} // para que funcione el onRefresh
        refreshing={refreshing} // para que funcione el onRefresh
        onRefresh={async () => {
          //console.log('refreshing') // cuando se desliza la pantalla con el dedo aparece ese texto en consola
          setRefreshing(true)
          await loadData(); // cada vez que deslizamos el dedo traemos los datos desde la API
          setRefreshing(false)
        }}  
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#fff', // blanco
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '90%' // para que ocupe todo el ancho de la pantalla
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  }
})

export default App
