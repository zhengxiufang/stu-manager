import React, { useState,useEffect } from 'react';
import {Form,Card,Input, Button,message,Upload,Icon} from 'antd';
// 引入富文本编辑器组件
import BraftEditor from 'braft-editor';
// 引入富文本编辑器样式
import 'braft-editor/dist/index.css';
import {createApi,getOneById,modifyOne} from '../../../services/products';
import FormItem from 'antd/lib/form/FormItem';
import {serverUrl} from '../../../utils/config';

function Edit(props){
    //console.log(props);
    //props.match.params.id存在的话表示修改，否则为新增
    const {getFieldDecorator} = props.form;
    const [currentData,setCurrentData] = useState({});
    const [imageUrl,setImageUrl] = useState('');
    const [loading,setLoading] = useState(false);
    const [editorState,setEditorState] = useState(BraftEditor.createEditorState(''));
    //初始化的时候执行加载数据
    useEffect(()=>{
        if(props.match.params.id){
            getOneById(props.match.params.id)
                .then(res=>{
                    //console.log(res)//取数据
                    setCurrentData(res)
                    setImageUrl(res.coverImg)
                    //console.log(res.content)
                    setEditorState(BraftEditor.createEditorState(res.content))//获取完数据之后创建数据
                })
        }
    },[])
    
    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );

    //图片上传    
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
          return;
        }
        if (info.file.status === 'done') {
            //上传成功
          // Get this url from response in real world.
          setLoading(false);
          //console.log(info);
          setImageUrl(info.file.response.info)
      };
    };

    //富文本编辑器改变
    const handleEditorChange = (v) => {
        setEditorState(v)
    }

    const priceValidate = (rules,value,callback)=>{
        //value*1转为数字
        if(value*1>100){
            callback('价格不能大于100')
        }else{
            callback()
        }
    }

    const handleSubmit = e =>{
        //editorState.toHTML()获取当前富文本的内容
        //console.log(editorState.toHTML())
        e.preventDefault()//阻止表单默认行为
        
        //验证
        props.form.validateFieldsAndScroll((err,values)=>{
            if(!err){
                //console.log(values)//输出提交后的value值
                //console.log('提交')
                //此处需要调用api接口
                if(props.match.params.id){//有id就是修改接口
                    modifyOne(props.match.params.id,{...values,coverImg:imageUrl,content:editorState.toHTML()})
                        .then(res=>{
                            //console.log(res);
                            props.history.push('/admin/products')

                        })
                        .catch(err=>{
                            //console.log(err)
                        })
                }else{//无id就是新增接口
                    createApi({...values,coverImg:imageUrl,content:editorState.toHTML()})
                        .then(res=>{
                            //console.log(res);
                            props.history.push('/admin/products')

                        })
                        .catch(err=>{
                            //console.log(err)
                        })
                }
                
            }else{
                message.error('请输入正确的内容')
            }
        })
    }
    return (
        <Card
            title="商品编辑"
            extra={
                <Button onClick={()=>props.history.push('/admin/products')}>
                    返回
                </Button>
            }
        >
            <Form onSubmit={e=>handleSubmit(e)}>
                <Form.Item label="名字">
                    {getFieldDecorator('name',{
                        rules:[
                            {
                                required:true,
                                message:"请输入商品名字",
                            }
                        ],
                        initialValue:currentData.name
                    })(<Input placeholder='请输入商品名字'/>)
                    }
                    
                </Form.Item>
                <Form.Item label="价格">
                    {getFieldDecorator('price',{
                        rules:[
                            {
                                required:true,
                                message:"请输入商品价格",
                            },
                            {
                                validator:priceValidate
                            }
                            
                        ],
                        initialValue:currentData.price
                    })(<Input placeholder='请输入商品价格'/>)
                    }
                    
                </Form.Item>
                <Form.Item label="主图">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={serverUrl+'/api/v1/common/file_upload'}
                        onChange={(info)=>handleChange(info)}
                    >
                        {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="详情"> 
                    <BraftEditor
                        value={editorState}
                        onChange={(e)=>handleEditorChange(e)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({name:'productEdit'})(Edit)
