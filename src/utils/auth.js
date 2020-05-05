export function getToken(){
    return localStorage.getItem('token');
}

export function setToken(token){
    localStorage.setItem('token',token);
}

//当点击logout退出的时候清除token
export function clearToken(){
    localStorage.removeItem('token');
}
//是否登录
export function isLogined(){
    if(localStorage.getItem('token')){
        return true;
    }
    return false;
}