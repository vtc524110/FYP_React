/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import CarsProperty from "components/Category/CarsProperty.js";
import Fashion from "components/Category/Fashion.js";
import HomeLiving from "components/Category/HomeLiving.js";
import HobbiesGames from "components/Category/HobbiesGames.js";
import MobilesElectronics from "components/Category/MobilesElectronics.js";
import Other from "components/Category/Other.js";


// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container
} from "reactstrap";

// core components

function SectionProgress() {
  const [activeTab, setActiveTab] = React.useState("1");
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <>
      <div className="section">
        <Container>
        <Card className="text-center">
                        <CardBody>
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav id="tabs" role="tablist" tabs>

                <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Cars & Property
                      </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Fashion
                      </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "3" ? "active" : ""}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    Home & Living
                      </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => {
                      toggle("4");
                    }}
                  >
                    Mobiles & Electronics
                      </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "5" ? "active" : ""}
                    onClick={() => {
                      toggle("5");
                    }}
                  >
                    Hobbies & Games
                      </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={activeTab === "6" ? "active" : ""}
                    onClick={() => {
                      toggle("6");
                    }}
                  >
                    Other
                      </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <TabContent activeTab={activeTab} className="text-center">
            <TabPane tabId="1">
              <CarsProperty />
            </TabPane>
            <TabPane tabId="2">
              <Fashion />
            </TabPane>
            <TabPane tabId="3">
              <HomeLiving />
            </TabPane>
            <TabPane tabId="4">
              <MobilesElectronics/>
            </TabPane>
            <TabPane tabId="5">
                    <HobbiesGames/>
            </TabPane>
            <TabPane tabId="6">
          <Other/>
            </TabPane>
          </TabContent>
          </CardBody>
          </Card>
        </Container>
      </div>{" "}
    </>
  );
}

export default SectionProgress;
