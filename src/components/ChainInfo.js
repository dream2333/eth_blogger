import { List, Divider, Card ,Spin} from 'antd'
import { BlockOutlined, WalletOutlined, MoneyCollectOutlined ,DatabaseOutlined,RedEnvelopeOutlined} from '@ant-design/icons';
import '../style/ChainInfo.css'
import React from "react";
import axios from "axios"

class ChainInfo extends React.Component {
    state = {
        walletInfo: {
            "sender": '',
            "balance": '',
            "gasPrice": '',
            "blockNumber": '',
            "hashrate": ''
        },
        loading: true
    };

    componentDidMount() {
        axios.get('http://localhost:5000/eth/api/v1.0/getWalletInfo').then(res => {
            this.setState({ walletInfo: res.data ,loading: false})
        })
    }

    render() {
        return (
            <div className="account">
                <Spin spinning={this.state.loading} tip="正在从链上读取...">
                <Card title={<div className="list-title">链上数据</div>} bordered={false} >
                    <List.Item.Meta
                        avatar={<WalletOutlined />}
                        style={{ overflow: 'hidden', wordWrap: 'break-word' }}
                        title="我的钱包地址"
                        description={this.state.walletInfo.sender}
                    />
                    <Divider />
                    <List.Item.Meta
                        avatar={<MoneyCollectOutlined />}
                        title="余额(ether)"
                        description={this.state.walletInfo.balance + "eth"}
                    />
                    <Divider />
                    <List.Item.Meta
                        avatar={<RedEnvelopeOutlined />}
                        title="当前Gas单位费用(milliether)"
                        description={this.state.walletInfo.gasPrice}
                    />
                    <Divider />
                    <List.Item.Meta
                        avatar={<DatabaseOutlined />}
                        title="区块高度"
                        description={this.state.walletInfo.blockNumber}
                    />
                    <Divider />
                    <List.Item.Meta
                        avatar={<BlockOutlined />}
                        title="链上算力(h/s)"
                        description={this.state.walletInfo.hashrate + ""}
                    />
                </Card>
                </Spin>
            </div>
        )
    }
}

export default ChainInfo