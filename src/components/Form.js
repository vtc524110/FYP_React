import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import {
    Button,
    FormGroup,
    Input,
    Container,
    Row,
    Col
} from "reactstrap";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            biddings: [],
            category: Array(),
            lastID: "",
            title: "",
            sellingPrice: "",
            sellerID: "",
            loading: true,
            error: null
        };

    }

    postForm(lastID, title, price, sellerID) {
        axios.post("http://desmond.business:8080/fyp/postBidding", {
            "id": lastID,
            "title": title,
            "category_third_lv_id": null,
            "condition_id": null,
            "details": null,
            "selling_price": null,
            "bidding_price": price,
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
            "bidding_currency": null,
            "district_id": null,
            "seller_customer_id": sellerID,
            "buyer_customer_id": null,
            "bidding_status_id": 1,
            "logistics_di_id": null,
            "payment_id": null,
            "seller_ref_id": null,
            "buyer_ref_id": null,
            "remarks": null,
            "create_timestamp": "2020-05-17 15:14:00",
            "modify_timestamp": null
        })
            .then(function (response) {
                console.log(response);
                this.setState({
                    modalIsOpen: true
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://desmond.business:8080/fyp/postBidding', {
            "id": this.state.lastID,
            "title": this.state.title,
            "category_third_lv_id": null,
            "condition_id": null,
            "details": null,
            "selling_price": this.state.sellingPrice,
            "bidding_price": null,
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
            "bidding_currency": null,
            "district_id": null,
            "seller_customer_id": 31,
            "buyer_customer_id": null,
            "bidding_status_id": this.state.sellerID,
            "logistics_di_id": null,
            "payment_id": null,
            "seller_ref_id": null,
            "buyer_ref_id": null,
            "remarks": null,
            "create_timestamp": "2020-05-17 15:14:00",
            "modify_timestamp": null
        })
            .then(function (response) {
                console.log("Successful posting!!!")
                console.log(response);
            })
            .catch(function (error) {
                console.log("Error~~~ posting!!!")
                console.log(error);
            });
    }

    handleInputChange = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(event.target.name)
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount() {
        // Remove the 'www.' to cause a CORS error (and see the error state)
        axios.get("http://desmond.business:8080/fyp/getBiddings")
            .then(res => {
                // Transform the raw data by extracting the nested biddings

                const biddings = res.data.results;
                //console.log(biddings);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    biddings: biddings,
                    lastID: biddings[0].id + 1,
                    title: biddings[0].title,
                    sellingPrice: biddings[0].selling_price,
                    sellerID: biddings[0].seller_customer_id,
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
        
        this.renderCategoryOption()

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

        console.log(this.state.biddings[0]);
        return (
            <h6>
                Success getting Bidding Records
            </h6>
        );
    }

    renderCategoryOption = () => {
        axios.get("http://desmond.business:8080/fyp/getCategoryFirstLvs")
            .then(res => {
                // Transform the raw data by extracting the nested posts
                
                const posts = res.data.results;
                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                posts.forEach((elm) => {
                    console.log(elm.category_first_lv_name);
                    this.category.push(
                        <option>{elm.category_first_lv_name}</option>
                    )
                })
                this.setState({
                    category: posts,
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

    render() {

        return (
            <div className="section section-buttons">
                <Container>
                    <div className="title">
                        <h3>Sell Information Form</h3>
                        <h6>Form ID : {this.state.lastID}</h6>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label>Title</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id={"title"}
                                    placeholder={this.state.title}
                                    onChange={this.handleInputChange}
                                    ref={(input) => this.myinput = input}
                                />
                            </div>
                            <div class="form-group col-md-6">
                                <label>Category</label>
                                <select id="category" class="form-control">
                                    <option selected>Choose category...</option>
                                    <option>...</option>
                                    {this.state.category}
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                class="form-control"
                                id="description"
                                placeholder="Description..."
                                onChange={this.handleInputChange}
                                ref={(input) => this.myinput = input}
                            />
                        </div>
                        <div class="form-group">
                            <label>Address 2</label>
                            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label>Selling Price</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="sellingPrice"
                                    placeholder = {this.state.sellingPrice}
                                />
                            </div>
                            <div class="form-group col-md-2">
                                <label>Currency</label>
                                <select id="currency" class="form-control">
                                    <option selected>Choose...</option>
                                    <option>HKD</option>
                                    <option>USD</option>
                                    <option>JPY</option>
                                </select>
                            </div>  
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" value="" />
                                                                Check me out
          <span class="form-check-sign">
                                        <span class="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button type="submit"
                            class="btn btn-primary"
                        >Sell</button>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Form;
