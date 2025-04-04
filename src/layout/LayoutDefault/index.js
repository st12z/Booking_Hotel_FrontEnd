import { Content } from 'antd/es/layout/layout';
import Header from './header';
import {Layout} from 'antd';
import {Outlet} from 'react-router-dom';
import Footer from './footer';
import "./LayoutDefault.scss";
function LayoutDefault(){
  return(
    <>
      <div className='layout-default'>
        <Header/>
        <Layout className='container' style={{backgroundColor:'#fff'}}>
          <Content className='contet'>
            <Outlet/>
          </Content>
        </Layout>
        <Footer/>
      </div>
    </>
  )
}
export default LayoutDefault;