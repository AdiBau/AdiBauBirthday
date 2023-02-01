import React from 'react'
import { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import axios from 'axios'

import DateTime from 'react-native-customize-selected-date'

function NewDate(props) {
  const [name, setName] = useState({ imie: '', nazwisko: '' })
  const [kal, setKal] = useState({ isVisible: false, set: false, date: 'Wybierz' })
  const [state, setState] = useState({ time: '' })
  let newItem = []

  const customWeekdays = ['N', 'Pn', 'Wt', 'Śr', 'Cz', 'Pi', 'So']

  function kalendarzShow() {
    setKal({ isVisible: true })
  }
  function zapisz() {
    if (name.imie !== '' && name.nazwisko !== '' && kal.date !== '') {
      newItem.push({ imie: name.imie, nazwisko: name.nazwisko, data: kal.date, id: new Date(), last: '', dataLast: '' })
      //
      const url = 'https://biuro.adibau.pl/birthday/list'

      fetch(url, {
        method: 'post',
        body: JSON.stringify(newItem[0]),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          props.refresh.setRefresh(!props.refresh.refresh)
          props.newDateVisible(false)
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      alert('Prosze wypełnić wszystkie pola')
    }
  }

  function selectedDate(date) {
    setKal({ ...kal, isVisible: false, set: true, date: date.toString() })
  }
  function renderChildDay(day) {
    //   nic pozostaw
  }

  function anuluj() {
    props.newDateVisible(false)
  }

  return (
    <>
      <View style={styles.view}>
        <Text style={styles.text}>Imie</Text>
        <TextInput
          placeholder='IMIE'
          style={styles.textInput}
          value={name.imie}
          onChange={(text) => {
            setName({ ...name, imie: text.nativeEvent.text })
          }}
        ></TextInput>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Nazwisko</Text>
        <TextInput
          placeholder='NAZWISKO'
          style={styles.textInput}
          value={name.nazwisko}
          onChange={(text) => {
            setName({ ...name, nazwisko: text.nativeEvent.text })
          }}
        ></TextInput>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>Data urodzenia</Text>
        {!kal.isVisible ? <Button color={'#6B7F82'} title={kal.date} onPress={kalendarzShow}></Button> : <Text></Text>}
      </View>
      <View>
        {kal.isVisible && <DateTime date={state.time} changeDate={(date) => selectedDate(date)} format='YYYY-MM-DD' renderChildDay={(day) => renderChildDay(day)} customWeekdays={customWeekdays} />}
        <View style={styles.buttons}>
          <View>
            <Button color={'#6B7F82'} title='Zapisz' onPress={zapisz}></Button>
          </View>
          <View>
            <Button color={'red'} title='Anuluj' onPress={anuluj}></Button>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  text: {
    display: 'flex',
    flex: 1,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    display: 'flex',
    flex: 2,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 5,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  view: {
    display: 'flex',
    flexDirection: 'row',
    width: '80%',
    borderColor: 'blue',
    borderWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7C99B4',
  },
  buttons: {
    marginTop: 5,
    marginBottom: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
})
export default NewDate
