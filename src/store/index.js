//创建redux数据
import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import product from './reducers/product';
import notice from './reducers/notice';
//在redux里，商品列表需要调用服务器端你接口做异步处理，此时需要引入react-thunk插件
//异步action需要使用redux-thunk
import thunk from 'redux-thunk';

//多个合并为一个
const rootReducers = combineReducers({
    product,//product:product属性名和属性值一样，js里可以简写为一个
    notice
});

export default createStore(rootReducers,compose(applyMiddleware(...[thunk])))