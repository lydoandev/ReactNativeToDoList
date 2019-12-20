

import React, { Component } from 'react'
import { Text, FlatList, SectionList, ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import ItemTask from './ItemTask';
import FormAddNew from './FormAddNew';

export default class ListTask extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      datas: [
        {
          date: '22/11/2019',
          data: [{
            "id": 1,
            "task": "Mua nhà 10 tỉ",
            "status": true
          },
          {
            "id": 2,
            "task": "Mua xe",
            "status": false
          },
          {
            "id": 3,
            "task": "Bỏ tật bốc phét",
            "status": false
          }],

        },
        {
          date: '8/10/2019',
          data: [{
            "id": 1,
            "task": "Làm todolist",
            "status": true
          },
          {
            "id": 2,
            "task": "Có người yêu",
            "status": false
          },
          {
            "id": 3,
            "task": "Mua váy",
            "status": false
          }]
        }],
      error: null
    }
  }

  componentDidMount() {
    // this.getData();
  }

  getData = () => {
    console.log("Got data");

    const url = "http://5dfc23da0301690014b90229.mockapi.io/api/todolist/tasks";

    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data.task,
          error: res.error || null,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }

  addNewTask = (taskItem) => {
    var { task, date } = taskItem;
    var { datas } = this.state;
    var found = datas.findIndex(item => item.date == date)
    console.log("index", found);
    if (found != -1) {
      datas[found].data.push({
        task,
        status: false
      })
    } else {
      datas.push({
        date,
        data: [{
          task,
          status: false
        }]
      })
    }
    this.setState(datas);
  }

  render() {
    const { datas, loading } = this.state;
    console.log(datas)

    if (loading) {
      return (<ActivityIndicator size="large" color="#0000ff" />)
    }
    return (
      <ScrollView style={styles.taskList}>
        <FormAddNew addNewTask={this.addNewTask}></FormAddNew>
        <SectionList
          sections={datas}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ItemTask item={item} />}
          renderSectionHeader={({ section: { date } }) => (
            <Text style={styles.dateText}>{date}</Text>
          )}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  taskList: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column'
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold"
  }
})