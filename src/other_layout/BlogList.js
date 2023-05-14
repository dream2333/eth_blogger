import React, { Component } from 'react'
import { Row, List } from 'antd'
import { CalendarOutlined, WalletOutlined, MessageOutlined } from '@ant-design/icons';
import axios from "axios"
import moment from 'moment';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mylist: []
    };
  }


  componentDidMount() {
    axios.get('http://localhost:5000/eth/api/v1.0/blogList').then(res => {
      this.setState({ mylist: res.data })
      console.log(moment(res.data[0]["time_stamp"] * 1000).format("YYYY-MM-DD HH:mm:ss"))
    })

  }

  render() {
    return (
      <List
        itemLayout="vertical"
        dataSource={this.state.mylist}
        renderItem={item => (
          <List.Item>
            <div className="list-title">{item.title}</div>
            <div className="list-icon">
              <span><CalendarOutlined /> {moment(item.time_stamp * 1000).format("YYYY-MM-DD HH:mm")}</span>
              <span><WalletOutlined />  {item.sender}</span>
              <span><MessageOutlined /> {item.id}</span>
            </div>
            <div className="list-context">{item.abstract}</div>
          </List.Item>
        )}
      />

    )
  }
}

