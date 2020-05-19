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
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Container, Row, Col } from 'reactstrap';
// core components

function SectionCatalogue() {

    return (
        <>
            <div className="section">

                <Container className="text-center">
                    <Card className="text-center">
                        <CardBody>
                            <Row>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <Card style={{ width: '20rem' }}>
                                    <CardImg top src={require("assets/img/mac_apple.jpg")} alt="..." />
                                    <CardBody>
                                        <CardTitle>Super Computer</CardTitle>
                                        <CardText>Give you best performance</CardText>
                                        <Button color="primary">$5400000</Button>
                                    </CardBody>
                                </Card>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <Card style={{ width: '20rem' }} className="text-center">
                                    <CardImg top src={require('assets/img/benz.png')} alt="..." />
                                    <CardBody>
                                        <CardTitle>Benz</CardTitle>
                                        <CardText>Sell it quicky, dont think</CardText>
                                        <CardText>Used 10 years, 99% new</CardText>
                                        <Button color="primary">$1200</Button>
                                    </CardBody>
                                </Card>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <Card style={{ width: '20rem' }} className="text-right">
                                    <CardImg top src={require('assets/img/aeroplane.jpg')} alt="..." />
                                    <CardBody>
                                        <CardTitle>Aeroplane</CardTitle>
                                        <CardText>Have you tried buying an aeroplane ?</CardText>
                                        <Button color="primary">$12M ( $12000000 )</Button>
                                    </CardBody>
                                </Card>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                <Col className="ml-auto mr-auto text-center" md="8">
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>

        </>
    );
}

export default SectionCatalogue;
