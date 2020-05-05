import React,{useEffect,useState} from 'react';//useEffect,useState数据和副作用，hook里组件初始化的时候添加
import { Card, Table, Button,Popconfirm } from 'antd';
//通过dispatch派发action
import {connect} from 'react-redux';
import {loadProduct} from '../../../store/actions/product';
import {listApi,delOne,modifyOne} from '../../../services/products';
import {serverUrl} from '../../../utils/config';
import './list.css'
// const dataSource = [{
//     id:1,
//     name:'香皂',
//     price:5
// },{
//     id:2,
//     name:'特仑苏',
//     price:6
// },{
//     id:3,
//     name:'小浣熊',
//     price:1.5
// }]

function List(props) {
    console.log(props)
    //定义局部状态
    // const [dataSource,setDataSource] = useState([]);
    // const [total,setTotal] = useState(0);
    // const [currentPage,setCurrentPage] = useState(1);//设置当前页，局部状态为1

    //取数据
    const {list,page,total} = props

    useEffect(()=>{
        //加载完成之后触发加载数据的操作，loadProduct方法传了一个对象作为参数{}
        props.dispatch(loadProduct({
            page:1,
            //name:'小米'
        }))
        //加载数据不用了
        // listApi().then(res=>{//输出列表数据
        //     //console.log(res);
        //     setDataSource(res.products);
        //     setTotal(res.totalCount);
        // });
        
    },[]);

    const loadData = ()=>{
        //为了使点击下一页有效果
        props.dispatch(loadProduct({
            page:page,
            //name:'小米'
        }))
        //console.log(page)
        //也不用了
        // listApi(page).then(res=>{
        //     setDataSource(res.products);
        //     setTotal(res.totalCount);
        //     setCurrentPage(page)
        // });
    }
    //组件初始化的时候执行
    const columns = [{
        title:'序号',
        key:'_id',
        width:80,
        align:"center",
        render:(tex,record,index)=>index+1
    },{
        title:'名字',
        dataIndex:'name',

    },{
        title:'主图',
        dataIndex:'coverImg',
        render:(txt,record)=>
            record.coverImg?(
                <img
                    src={serverUrl+record.coverImg} 
                    alt={record.name} 
                    style={{width:"120px"}}
                    />
            ):("暂无图片")

    },{
        title:'价格',
        dataIndex:'price',

    },
    {
        title:'是否在售',
        dataIndex:'onSale',
        render:(txt,record)=>(record.onSale?"在售":"已下架")
    },{
        title:'操作',
        render:(tex,record,index)=>{
            return(<div>
                <Button 
                    type='primary' 
                    size="small" 
                    onClick={()=>{
                        //当点击修改的时候，跳转到edit页面，传递id作为参数
                        props.history.push(`/admin/products/edit/${record._id}`)
                    }}
                >
                    修改
                </Button>
                <Popconfirm
                    title="确定删除此项？" 
                    onCancel={()=>console.log('用户取消删除')} 
                    onConfirm={()=>{
                        //console.log('用户确认删除')
                        //此处调用api接口进行相关操作
                        delOne(record._id)
                            .then(res=>{
                                loadData()
                            })
                    }}
                 >
                    <Button style={{margin:"0 1rem"}} type="danger" size="small">
                        删除
                    </Button>
                </Popconfirm>
                <Button 
                    size="small" 
                    onClick={()=>{
                        //修改在售状态
                        modifyOne(record._id,{onSale:!record.onSale})
                            .then(res=>{
                                loadData()//括号里直接写1加载的始终是第一页数据，就会出现小bug，你改其他页数据也会跳转到第一页 解决办法：1.const [currentPage,setCurrentPage] = useState(1);2.setCurrentPage(page)3.loadData(currentPage)
                            })
                    }}
                >
                    {record.onSale?"下架":"上架"}
                </Button>
            </div>)
        }
    }]
    return (
        <Card 
            title="商品列表" 
            extra={
            <Button 
                type="primary" 
                size="small" 
                onClick={()=>props.history.push('/admin/products/edit')}
            >
                新增
            </Button>
            }
        >
            <Table
                rowKey="_id" 
                rowClassName={record=>record.onSale?"":"bg-red"}
                pagination={{total,defaultPageSize:2,onChange:(p)=>{
                    props.dispatch(loadProduct({page:p}))//点击分页的时候把对应页码传进去，点击删除和修改之后把当前页页码传入
                }}} 
                columns={columns} 
                bordered 
                //dataSource={dataSource}
                dataSource={list}

            />
        </Card>
    )
}

//state=>state返回所有的数据
export default connect(state=>state.product)(List)
