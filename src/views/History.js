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

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import HistoryItem from "components/HistoryItem.js";

//import SectionForm from "views/index-sections/SectionForm.js";
import { Link, Route } from "react-router-dom";

function History({ match }) {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("CarsForSale");
        return function cleanup() {
            document.body.classList.remove("CarsForSale");
        };
    });
    return (
        <>
            <IndexNavbar />
            <IndexHeader />
            <div className="main">
                {" "}
                <HistoryItem
                    title="History"
                    url={match.url}
                    seller_customer_id="33"
                />
                <DemoFooter />
            </div>
        </>
    );

}

export default History;
