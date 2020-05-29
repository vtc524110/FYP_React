import React from 'react';
import axios from 'axios';
import { Link, Route, Router } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

import Product from "views/ProductPage.js";
import Item from "components/Item.js"
import {
    Button,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardImg,
    CardTitle,
    CardText
} from "reactstrap";
//import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

class Cars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            catalogue: [],
            currentIndex: 0,
            category_third_lv_id: 1,
            loading: true,
            error: null
        };
    }

    fetchBiddings = () => {
        axios.get("http://desmond.business:8080/fyp/getBiddings")
            .then(res => {
                // Transform the raw data by extracting the nested posts
                const tmpCatalogue = []
                const updateCatalogue = this.state.catalogue
                const posts = res.data.results;
                posts.forEach((elm) => {
                    if (elm.category_third_lv_id == this.state.category_third_lv_id) {
                        updateCatalogue.push(
                            <Col key={elm.id} className="col-md-4">
                                <Card style={{ width: '20rem' }}>
                                    <CardImg top src={require("assets/img/mac_apple.jpg")} alt="..." />
                                    <CardBody>
                                        <CardTitle>{elm.title}</CardTitle>
                                        <CardText>{elm.create_timestamp}</CardText>
                                        <Link to={`/CarsforSale/${elm.id}`}>
                                            <Button color="primary">
                                                ${elm.selling_price}
                                            </Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    }
                })
                console.log(this.state.catalogue);
                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    posts,
                    catalogue: updateCatalogue,
                    currentIndex: this.state.currentIndex + 10,
                    loading: false,
                    error: null
                });
            })
            .catch(err => {
                // Something went wrong. Save the error in state and re-render.
                this.setState({
                    loading: false,
                    error: err
                });
            });
    }

    componentDidMount() {
        // Remove the 'www.' to cause a CORS error (and see the error state)
        this.fetchBiddings()
    }

    showMore = () => {
        this.fetchBiddings()
        console.log(this.state.catalogue);
        console.log(this.state.currentIndex);
    }


    renderLoading() {
        return <div>Loading...</div>;
    }

    renderError() {
        return (
            <div>
                Uh oh: {this.state.error.message}
            </div>
        );
    }

    renderPosts() {
        if (this.state.error) {
            return this.renderError();
        }

        console.log(this.state.posts[0]);
        return (
            <h6>
                Success getting Bidding Records
            </h6>

        );
    }

    render() {
        const catalogue = this.state.catalogue

        if (this.state.loading) {
            return (

                <div className="section">
                    <Container className="text-center">

                        <Card className="text-center">
                            <Row>
                                <Col>
                                    <div className="title">
                                        <h1 className="bd-title">{this.props.title}</h1>

                                    </div>
                                </Col>
                            </Row>
                            <CardBody>

                                <div>
                                    <Spinner animation="border" variant="primary" />
                                </div>
                                <Row>
                                    <Col>
                                        <Button
                                            className="btn-round mr-1"
                                            color="primary"
                                            type="button"
                                            onClick={this.fetchBiddings}
                                        >
                                            Show More
                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>

                    <Route exact path="/carsForSale/:id" render={(props) => {
                        const id = props.match.params.id;
                        return <Item id={id}{...props} />
                    }} />

                </div>

            )
        } else {

            return (

                <div className="section">
                    <Container className="text-center">

                        <Card className="text-center">
                            <Row>
                                <Col>
                                    <div className="title">
                                        <h1 className="bd-title">{this.props.title}</h1>

                                    </div>
                                </Col>
                            </Row>
                            <CardBody>
                                <Row>
                                    {catalogue}
                                </Row>
                                <Row>
                                    <Col>
                                        <Button
                                            className="btn-round mr-1"
                                            color="primary"
                                            type="button"
                                            onClick={this.fetchBiddings}
                                        >
                                            Show More
                            </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>

                    <Route exact path="/carsForSale/:id" render={(props) => {
                        const id = props.match.params.id;
                        return <Item id={id}{...props} />
                    }} />

                </div>
            );
        }
    }
}

export default Cars;