import React from 'react';
import {Card,List,Typography, Button} from 'antd';
//当我们点击全部已读按钮之后，通过dispatch派发一个action来改变reducers
import {connect} from 'react-redux';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

function Index(props) {
    return (
        <Card title="通知中心" extra={<Button onClick={()=>props.dispatch({
            type:"READ_ALL"
            
        })}>全部已读</Button>}>
            <List 
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item style={{display:"flex",alignContent:"spaced-between"}}>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    <Button size="small">已读</Button>
                    </List.Item>
                )}
            />          
        </Card>
    )
}

export default connect(state=>state)(Index)
