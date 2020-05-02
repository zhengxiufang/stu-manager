import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {adminRoutes} from './routes'
import Frame from './components/Frame/Index'
//import zhCN from 'antd/es/locale/zh_CN';
//import {ConfigProvider} from 'antd';
//import 'moment/locale/zh-cn'

function App() {
  return (
    
      <Frame>
        <Switch>
          {adminRoutes.map(route =>{
            return (
              <Route 
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={routeProps =>{
                  return <route.component {...routeProps}/>
                }}
              />
            )
          })}
          <Redirect to="/404"/>
        </Switch>
      </Frame>
    
  );
}

export default App;
