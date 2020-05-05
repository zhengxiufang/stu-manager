import React from 'react';
import { Layout, Menu, Breadcrumb, Icon,Dropdown,Avatar,message,Badge } from 'antd';

import {connect} from 'react-redux';
import logo from './logo.png';
import {adminRoutes} from '../../routes';//引入子路由
import {withRouter} from 'react-router-dom';//在组件里使用路由跳转需要加withRouter否则会报错TypeError: Cannot read property 'push' of undefined
import './frame.css';
import {clearToken} from '../../utils/auth';//引入auth清除掉token

const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route=>route.isShow)//需要显示的在侧边导航栏

function Index(props) {
    console.log(props)
    const popMenu = (
        <Menu
            onClick={(p) => {
                if (p.key === "logOut") {//退出
                    clearToken();
                    props.history.push('/login');
                } else {
                    //message.info(p.key);//弹出一个tip提示
                    if(p.key="noti"){
                        props.history.push('/admin/notices');

                    }
                }
            }}
        >  
            <Menu.Item key="noti">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logOut">退出</Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Header className="header" style={{
                backgroundColor:'#428BCA'
            }}
            >
                <div className="logo">
                    <img src={logo} alt="logo"/>
                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Avatar>U</Avatar>
                        {/*通知中心上的小红点，所有的都已读了dot就不显示了*/ }
                        <Badge dot={!props.isAllRead}>
                            <span style={{color:"white"}}>超级管理员</span>
                        </Badge>
                        <Icon type="down"/>
                    </div>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(route=>{
                            return(
                                <Menu.Item 
                                    key={route.path} 
                                    onClick={p=>props.history.push(p.key)}
                                    >
                                    <Icon type={route.icon}/>
                                    {route.title}
                                </Menu.Item>)
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>*/}
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

//export default connect(state=>state)(withRouter(Index))里
//state=>state意义相当于定义了一个方法mapStateToProps此方法接受一个参数state，返回的还是一个state
const mapStateToProps = state =>state.notice
export default connect(mapStateToProps)(withRouter(Index))

