import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

const App = () => {

  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    const data = await res.json()
    console.log(data)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <View>
      <Text>Hola mundo</Text>
    </View>
  )
}

export default App
