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

class Item extends React.Component {
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
            remarks: null,
            checked: false,
            loading: true,
            error: null
        };
    }

    fetchBiddings = () => {
        console.log(`http://desmond.business:8080/fyp/getBiddingsByID/${this.props.id}`)
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
                                <CardText>Create time: {posts.create_timestamp} Latest Price: ${posts.bidding_price} {posts.bidding_currency} Remark: {posts.remarks}</CardText>
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
        axios.put('http://desmond.business:8080/fyp/putBidding', {
            "id": this.state.item.id,
            "title": this.state.item.title,
            "category_third_lv_id": this.state.item.selectedThirdCategory,
            "condition_id": this.state.item.condition_id,
            "details": this.state.item.details,
            "selling_price": this.state.item.selling_price,
            "bidding_price": this.state.bidding_price,
            "closing_date_timestmp": null,
            "theBiddingPhotos": {
                "id": 118,
                "photo1": null,
                "photo_type1": null,
                "photo2": null,
                "photo_type2": null,
                "photo3": null,
                "photo_type3": null,
                "create_timestamp": "2020-05-17 15:14:00",
                "modify_timestamp": null
            },
            "bidding_currency": this.state.item.bidding_currency,
            "district_id": this.state.item.district_id,
            "seller_customer_id": this.state.item.seller_customer_id,
            "buyer_customer_id": this.state.item.buyer_customer_id,
            "bidding_status_id": this.state.item.sellerID,
            "logistics_di_id": this.state.item.logistics_di_id,
            "payment_id": this.state.item.payment_id,
            "seller_ref_id": this.state.item.seller_ref_id,
            "buyer_ref_id": this.state.item.buyer_ref_id,
            "remarks": this.state.remarks,
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
                                    <h6>{this.state.bidding_price}</h6>
                                    <h6>{this.state.remarks}</h6>
                                        <label>Post New Selling Price</label>
                                        <input
                                            id="bidding_price"
                                            name="bidding_price"
                                            type="text"
                                            class="form-control"
                                            placeholder={this.state.item.bidding_price}
                                            onChange={this.handleInputChange}
                                        />

                                        <form onSubmit={this.handleSubmit}>


                                            <div class="form-group">
                                                <label>Remarks</label>
                                                <input
                                                    id="remarks"
                                                    name="remarks"
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Remark..."
                                                    onChange={this.handleInputChange}
                                                    ref={(input) => this.myinput = input}
                                                />
                                            </div>


                                            <div class="form-group">
                                                <div class="form-check">
                                                    <label class="form-check-label">
                                                        <input class="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            onChange={this.handlecheckBoxChange} />
              Check me out
<span class="form-check-sign">
                                                            <span class="check"></span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                            <button type="submit"
                                                class="btn btn-primary"
                                                disabled={!this.state.checked}
                                            >Bid for this item</button>
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

export default Item;