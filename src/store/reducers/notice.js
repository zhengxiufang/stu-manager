
//创建reducers reducers初始化的时候需要有一个初始值isAllRead:false,count:8
export default (state={isAllRead:false,count:8},action)=>{
    switch(action.type){
        case "READ_ALL":
            return {...state,isAllRead:true};
        default:
            return state;
    }
};
