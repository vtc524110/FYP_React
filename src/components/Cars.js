import React from 'react';
import axios from 'axios';

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
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

class Cars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            catalogue: Array(),
            currentIndex:0,
            loading: true,
            error: null
        };
    }
    
    fetchBiddings = () => {
        axios.get("http://desmond.business:8080/fyp/getBiddings")
            .then(res => {
                // Transform the raw data by extracting the nested posts
                const updateCatalogue = this.state.catalogue
                const posts = res.data.results;
                for (let index = this.state.currentIndex; index < this.state.currentIndex + 10; index++) {
                    updateCatalogue.push(
                        <Col>
                        <Card style={{ width: '20rem' }}>
                            <CardImg top src={require("assets/img/mac_apple.jpg")} alt="..." />
                            <CardBody>
                                <CardTitle>{posts[index].title}</CardTitle>
                                <CardText>{posts[index].create_timestamp}</CardText>
                                <Button color="primary">${posts[index].selling_price}</Button>
                            </CardBody>
                        </Card>
                        </Col>
                    )
                }
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

        return (

            <div className="section">
                <Container className="text-center">
                    <Card className="text-center">
                        <Row>
                            <Col>
                            <div className="title">
                                <h1 class="bd-title">Cars For Sale</h1>
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
            </div>
        );
    }
}

export default Cars;