import { StatusBar } from 'expo-status-bar'
import { FlatList, Modal, ScrollView, StyleSheet, Text, View } from 'react-native'

import Header from './components/header'
// import dataBase from './components/dataBase/dataBase'
import { useState, useEffect } from 'react'

export default function App() {
  const [refresh, setRefresh] = useState(false)
  const [data, setData] = useState([])
  let base = []

  useEffect(() => {
    const url = 'https://biuro.adibau.pl/birthday/list'
    fetch(url)
      .then((response) => response.json())
      .then((res) => {
        setData(res)
      })
      .catch((err) => console.log('error', err))
  }, [refresh])

  const pozostalo = (date) => {
    const month = date[5] + date[6]
    const day = date[8] + date[9]
    let last = Math.floor((new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()) - new Date(new Date().getFullYear(), Number(month), Number(day))) / 1000 / 60 / 60 / 24)
    return last < 0 ? (last = Math.abs(last)) : 365 - last
  }

  const modifyList = () => {
    data.map((e) => {
      base.push({
        nazwisko: e.nazwisko,
        imie: e.imie,
        data: e.data,
        id: e.id,
        last: pozostalo(e.data),
        dataLast: new Date(),
      })
    })
  }

  modifyList()

  function sortBaza() {
    // let byDate = dataBase.slice(0);
    return base.sort(function (a, b) {
      let x = a.last
      let y = b.last
      return x < y ? -1 : x > y ? 1 : 0
    })
  }

  return (
    <Modal animationType={'fade'}>
      <View style={styles.container}>
        <Header setRefresh={setRefresh} refresh={refresh} />
        <View style={[styles.viewItem]}>
          <Text style={[styles.textItem, styles.singleName]}>Name</Text>
          <Text style={[styles.textItem, styles.singleDate]}>Birthday data</Text>
          <Text style={[styles.textItem, styles.singleLeft]}>Left</Text>
        </View>
        <Text style={styles.line}></Text>
        <FlatList
          data={sortBaza()}
          renderItem={(item) => (
            <>
              <View style={[styles.viewItem, pozostalo(item.item.data) < 10 ? { backgroundColor: 'rgba(0, 255, 0, 0.5)' } : '']}>
                <Text style={styles.singleName}>
                  {item.item.nazwisko} {item.item.imie}
                </Text>
                <Text style={styles.singleDate}>{item.item.data}</Text>
                <Text style={styles.singleLeft}>{pozostalo(item.item.data)} </Text>
              </View>
              <Text style={styles.line}></Text>
            </>
          )}
          keyExtractor={(item) => item.id}
        ></FlatList>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 35,
    backgroundColor: 'rgb(142, 184, 229)',
    height: '100%',
    width: '100%',
  },
  singleName: {
    width: '50%',
    // alignSelf: 'center',
    textAlign: 'left',
  },
  singleDate: {
    width: '25%',
    textAlign: 'left',
  },
  singleLeft: {
    width: '25%',
    textAlign: 'right',
  },
  viewItem: {
    width: '98%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    marginHorizontal: 3,
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: '#7C99B4',
  },
  line: {
    width: '100%',
    borderColor: '#ddd',
    borderBottomWidth: 2,
    height: 5,
  },
  textItem: { fontWeight: 'bold' },

  text: { fontSize: 11 },
})
