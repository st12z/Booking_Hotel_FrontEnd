import { Content } from "antd/es/layout/layout";
import Header from "./header";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import "./LayoutDefault.scss";
import { createContext, useState } from "react";
export const SearchContext = createContext();
function LayoutDefault() {
  const [searchTrigger, setSearchTrigger] = useState(false);
  return (
    <>
      <div className="layout-default">
        <SearchContext.Provider value={{ searchTrigger, setSearchTrigger }}>
          <Header />
          <Layout className="container" style={{ backgroundColor: "#fff" }}>
            <Content className="contet">
              <Outlet />
            </Content>
          </Layout>
          <Footer />
        </SearchContext.Provider>
      </div>
    </>
  );
}
export default LayoutDefault;
