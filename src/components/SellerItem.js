import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'

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

class SellerItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            catalogue: [],
            item: {},
            currentIndex: 0,
            itemShow: 3,
            random: 0,
            bidding_price: null,
            buyer_customer_id : 33,
            remarks: null,
            checked: false,
            loading: true,
            error: null
        };
    }

    fetchBiddings = () => {
        axios.get(`http://desmond.business:8080/fyp/getBiddingHistoryByBiddingNumber/${this.props.id}`)
            .then(res => {
                // Transform the raw data by extracting the nested posts
                const updateCatalogue = this.state.catalogue
                const posts = res.data.results[0];
                this.setState({
                    bidding_price: posts.bidding_price,
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
        
        axios.get(`http://desmond.business:8080/fyp/getBiddingByID/${this.props.id}`)
            .then(res => {
                // Transform the raw data by extracting the nested posts
                const updateCatalogue = this.state.catalogue
                const posts = res.data.results;
                console.log(posts)
                updateCatalogue.push(
                    <Col key={posts.id} className="col-md-4">
                        <Card style={{ width: '20rem' }}>
                            <CardImg top src={require("assets/img/mac_apple.jpg")} alt="..." />
                            <CardBody>
                                <CardTitle>{posts.title}</CardTitle>
                                <CardText>Create time: {posts.create_timestamp} Latest Price: ${this.state.bidding_price} {posts.bidding_currency} Selling Price: ${posts.selling_price} {posts.bidding_currency} Remark: {posts.remarks}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                )

                console.log(this.state.catalogue);

                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    item: posts,
                    catalogue: updateCatalogue,
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

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://desmond.business:8080/fyp/postBiddingHistory', {
            "bidding_price": this.state.bidding_price,
            "buyer_customer_id": this.state.buyer_customer_id,
            "bidding_number": this.state.item.id
        })
            .then(function (response) {
                console.log("Successful updating!!!")
                console.log(response);
            })
            .catch(function (error) {
                console.log("Error~~~ updating!!!")
                console.log(error);
            });
        //window.location.reload(false);
    }

    handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlecheckBoxChange = (event) => {
        var checkBoxChange = this.state.checked
        this.setState({
            checked: !checkBoxChange
        })
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
                            <Spinner animation="border" variant="primary" />
                        </Card>
                    </Container>
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
                                        <h1 className="bd-title">Bid for {this.state.item.title}</h1>
                                    </div>
                                </Col>
                            </Row>
                            <CardBody>
                                <Row>
                                    <Col>
                                        {catalogue}
                                    </Col>
                                    <Col>
                                        <label>Latest bidding Price: </label>

                                        <form onSubmit={this.handleSubmit}>


                                            <div class="form-group">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            onChange={this.handlecheckBoxChange} />
                                                            Accept Offer
<span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit"
                                                class="btn btn-primary"
                                                disabled={!this.state.checked}
                                            >Confirm Offer</button>
                                        </form>


                                    </Col>
                                </Row>


                            </CardBody>
                        </Card>
                    </Container>
                </div>
            );
        }
    }
}

export default SellerItem;