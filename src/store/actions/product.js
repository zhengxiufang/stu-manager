import {listApi} from '../../services/products';//调用服务器接口需要引入


//payload表示我们接收的数据
export const loadProduct = payload =>async dispatch=>{
    console.log(payload);
    //传入参数payload.page即可翻页并显示对应页的内容
    const res = await listApi(payload.page);
    //当异步操作完成之后，通过dispatch触发reducer改变数据
    dispatch({
        //每一个action派发都必须要有一个type
        type:"PRODUCT_LOADED",
        payload:{...res,page:payload.page}
    });
};