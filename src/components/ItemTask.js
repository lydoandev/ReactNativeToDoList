import React, { Component } from 'react'
import { View, CheckBox, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class ItemTask extends Component {
  render() {
    const { id, task, status } = this.props.item;
    console.log("task", task)
    return (
      <TouchableOpacity style={styles.task}
        onPress={() => this.moveToScreen('Home')}>
        <CheckBox
          center
          title='Click Here'
          checked={status}
        />
        <Text style={styles.taskText} type='h5White'>{task}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    margin: 3,
    height: 40,
    flex: 1,
    flexDirection: "row",
    borderColor: '#d9d9d9',
    borderWidth: 1,
    alignItems: 'center'
  },
  taskText: {
  }
})
