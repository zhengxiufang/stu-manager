//初始化数据 数据 当前页 总数量
export default (state={list:[],page:1,total:0},action)=>{
    switch(action.type){
        case 'PRODUCT_LOADED':
            //console.log(action)//当加载数据的时候输出action地址
            return {...state,list:action.payload.products,page:action.payload.page,total:action.payload.totalCount};
        default:
            return state
    }

}