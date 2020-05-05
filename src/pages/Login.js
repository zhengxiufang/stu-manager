import React from 'react';
import { Form, Icon, Input, Button, Checkbox,Card, message } from 'antd';
import {setToken} from '../utils/auth';
import {loginApi} from '../services/auth';

import './login.css';


function Login(props) {
    const { getFieldDecorator } = props.form;
    const handleSubmit = e =>{
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //验证通过之后应该调接口 登陆成功之后跳转到管理后台首页
                // setToken(values.username);//手动写的token本地保存
                // props.history.push("/admin");
                loginApi({
                    userName:values.username,
                    password:values.password
                })
                    .then(res=>{
                        if(res.code === 'success'){
                            message.success('登录成功');
                            //当code码为success时把token值存一下
                            setToken(res.token);
                            props.history.push("/admin");
                        }else{
                            message.info(res.message)
                        }
                        //console.log(res)
                    })
                    .catch(err=>{
                        message.error('用户不存在')
                        //console.log(err)
                    })
            }
        });
    }
    
    return (
        <Card title="QF Admin SYS" className="login-form">
            <Form onSubmit={(e)=>handleSubmit(e)}>
                <Form.Item>
                {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名!' }],
                })(
                    <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                })(
                    <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    />,
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>记住我</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({name:'loginForm'})(Login)
