import { Comment, Tooltip, List, Avatar } from 'antd';
import moment from 'moment';
import React, { Component } from 'react'
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"

export default class Replys extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    actions: [<span key="comment-list-reply-to-0">回复</span>],
                    sender: '0xa1121b42d2adaf01b4b5d511cbc7dd3cd1a27b266b18a550c5519b2ce40f0d55',
                    content: (
                        <p>
                            这是一条测试评论
                        </p>
                    ),
                    datetime: (
                        <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().subtract(1, 'days').fromNow()}</span>
                        </Tooltip>
                    ),
                },
            ]
        };
    }


    componentDidMount() {
        axios.get('http://localhost:5000/eth/api/v1.0/commentList', { params: { blogIndex: 0 } }).then(res => {
            this.setState({ data: res.data })
            console.log(res.data)
        })
    }

    render() {
        return (<List
            className="comment-list"
            header={`${this.state.data.length} replies`}
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
                <li>
                    <Comment
                        actions={[<span key="comment-list-reply-to-0">回复</span>]}
                        author={item.sender}
                        avatar={<Avatar size="large" icon={<UserOutlined />} />}
                        content={item.content}
                        datetime={<Tooltip title={moment(item.time_stamp*1000).format('YYYY-MM-DD HH:mm')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>}
                    />
                </li>
            )}
        />
        )
    }
}