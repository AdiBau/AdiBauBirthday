import React, { useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import NewDate from './newDate'

function Header(props) {
  const [stateAdd, setStateAdd] = useState({ isVisible: false })

  function addClick() {
    setStateAdd({ isVisible: stateAdd.isVisible ? false : true })
  }
  return (
    <View style={styles.titel}>
      <Text style={styles.titel}>- - - AdiBau - - - Birthday Reminder</Text>
      <View style={styles.viewButtons}>
        <Button title='Add new Date' onPress={addClick}></Button>
      </View>
      {stateAdd.isVisible && <NewDate refresh={props} newDateVisible={setStateAdd} />}
    </View>
  )
}

const styles = StyleSheet.create({
  titel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    backgroundColor: '#7C99B4',
  },
  viewButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    padding: 15,
  },
})
export default Header
