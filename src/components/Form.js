import React from 'react';
import axios from 'axios';
import CustomModal from "components/CustomModal.js";
import S3 from 'react-aws-s3';

import {
    Container,
} from "reactstrap";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            biddings: [],
            category: [],
            mainCategory: null,
            selectedMainCategory: "",
            subCategory: null,
            selectedSubCategory: "",
            thirdCategory: null,
            selectedThirdCategory: "",
            lastID: "",
            title: "",
            remark: "",
            sellingPrice: "",
            sellerID: "",
            currency: null,
            checked: false,
            loading: true,
            error: null,
            files: null
        };

    }

    setImage = (event) => {
        let files = event.target.files;
        this.setState({ files: files }, () => { console.log(this.state.files) });
    }

    uploadImageS3 = (e) => {
        const config = {
            bucketName: 'caroubuy001',
            dirName: 'fyp_001', /* optional */
            region: 'eu-west-1',
            accessKeyId: 'AKIA5LDGYZWVLZLGCKKZ',
            secretAccessKey: '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',
            s3Url: 'http://caroubuy001.s3-website.us-east-2.amazonaws.com', /* optional */
        }

        const ReactS3Client = new S3(config);
        /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

        /* This is optional */
        const newFileName = 'test-file';
        console.log(this.state.files);
        for (var i = 0; i < this.state.files.length; i++) {
            ReactS3Client
                .uploadFile(this.state.files[i])
                .then(data => console.log(data))
                .catch(err => console.error(err))
        }


        /**
         * {
         *   Response: {
         *     bucket: "myBucket",
         *     key: "image/test-image.jpg",
         *     location: "https://myBucket.s3.amazonaws.com/media/test-file.jpg"
         *   }
         * }
         */
    }

    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://desmond.business:8080/fyp/postBidding', {
            "id": this.state.lastID,
            "title": this.state.title,
            "category_third_lv_id": this.state.selectedThirdCategory,
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
            "seller_customer_id": 33,
            "buyer_customer_id": null,
            "bidding_status_id": this.state.sellerID,
            "logistics_di_id": null,
            "payment_id": null,
            "seller_ref_id": null,
            "buyer_ref_id": null,
            "remarks": this.state.remarks,
            "create_timestamp": null,
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

    handleMainCategoryChange = (event) => {
        //event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })

        this.renderSubCategoryOption()

    }

    handleSubCategoryChange = (event) => {
        //event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })

        this.renderThirdCategoryOption()
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

        this.renderMainCategoryOption()

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

        return (
            <h6>
                Success getting Bidding Records
            </h6>
        );
    }

    renderMainCategoryOption = () => {
        const renderMainCategory = []
        renderMainCategory.push(
            <option selected>Choose Main Category...</option>
        )
        axios.get("http://desmond.business:8080/fyp/getCategoryFirstLvs")
            .then(res => {
                // Transform the raw data by extracting the nested posts

                const posts = res.data.results;
                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                posts.forEach((elm) => {

                    renderMainCategory.push(
                        <option
                            value={elm.id}
                        >{elm.category_first_lv_name}
                        </option>
                    );
                })
                this.setState({
                    category: posts,
                    mainCategory: renderMainCategory,
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

    renderSubCategoryOption = () => {
        const renderSubCategory = []
        axios.get("http://desmond.business:8080/fyp/getCategoryFirstLvs")
            .then(res => {
                // Transform the raw data by extracting the nested posts

                // Transform the raw data by extracting the nested posts
                const posts = this.state.category
                posts.forEach(elm => {
                    if (elm.id == this.state.selectedMainCategory) {
                        renderSubCategory.push(elm.theCategorySecondLvs.map((obj, index) =>
                            <option
                                value={obj.id}
                            >{obj.category_second_lv_name}
                            </option>
                        ))
                    }
                })

                this.setState({
                    subCategory: renderSubCategory,
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

    renderThirdCategoryOption = () => {
        const renderThirdCategory = []
        axios.get("http://desmond.business:8080/fyp/getCategoryFirstLvs")
            .then(res => {
                // Transform the raw data by extracting the nested posts

                // Transform the raw data by extracting the nested posts
                const posts = this.state.category
                console.log(posts)
                posts.forEach(elm => {
                    elm.theCategorySecondLvs.forEach(subElm => {

                        if (subElm.id == this.state.selectedSubCategory) {

                            renderThirdCategory.push(subElm.theCategoryThirdLvLv.map((obj, index) =>
                                <option
                                    value={obj.id}
                                >{obj.category_third_lv_name}
                                </option>
                            ))
                        }

                    })
                })
                console.log("selectedSubCategory has been changed to")
                console.log(renderThirdCategory[0][0].props.value)
                this.setState({
                    thirdCategory: renderThirdCategory,
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

        /*
                            <div className="title">

                        <h6>Form ID : {this.state.lastID}</h6>
                        <h6>Last Title: {this.state.title} </h6>
                        <h6>Last Selling Price: {this.state.sellingPrice}</h6>
                        <h6>Main Category: {this.state.selectedMainCategory}</h6>
                        <h6>Sub Category: {this.state.selectedSubCategory}</h6>
                        <h6>Third Category: {this.state.selectedThirdCategory}</h6>
                        <h6>Remark: {this.state.remark}</h6>
                        <h6>Selling Price: {this.state.sellingPrice}</h6>
                        <h6>Currency:{this.state.currency}</h6>
                        <h6>CheckBox: {this.state.checked.toString()}</h6>
                    </div>
                    */
        return (
            <div className="section section-buttons">
                <Container>
                    <h3>Sell Information Form</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                placeholder="Title..."
                                onChange={this.handleInputChange}
                                ref={(input) => this.myinput = input}
                            />
                        </div>
                        <div className="form-group">
                            <label>Main Category</label>
                            <select
                                id="selectedMainCategory"
                                name="selectedMainCategory"
                                className="form-control"
                                onChange={this.handleMainCategoryChange}
                                ref={(input) => this.myinput = input}
                            >
                                {this.state.mainCategory}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Sub Category</label>
                            <select
                                id="selectedSubCategory"
                                name="selectedSubCategory"
                                className="form-control"
                                onChange={this.handleSubCategoryChange}
                                ref={(input) => this.myinput = input}
                            >
                                <option selected>Choose Main Category...</option>
                                {this.state.subCategory}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Third Category</label>
                            <select
                                id="selectedThirdCategory"
                                name="selectedThirdCategory"
                                className="form-control"
                                onChange={this.handleInputChange}
                                ref={(input) => this.myinput = input}
                            >
                                <option selected>Choose Sub Category...</option>
                                {this.state.thirdCategory}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Remark</label>
                            <input
                                id="remark"
                                name="remark"
                                type="text"
                                className="form-control"
                                placeholder="Remark..."
                                onChange={this.handleInputChange}
                                ref={(input) => this.myinput = input}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label>Selling Price</label>
                                <input
                                    id="sellingPrice"
                                    name="sellingPrice"
                                    type="text"
                                    className="form-control"
                                    placeholder="Selling Price..."
                                    onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group col-md-2">
                                <label>Currency</label>
                                <select id="currency"
                                    name="currency"
                                    className="form-control"
                                    onChange={this.handleInputChange}
                                >
                                    <option selected>Choose...</option>
                                    <option>HKD</option>
                                    <option>USD</option>
                                    <option>JPY</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label>Picture Upload</label>
                                <input type="file" id="file" multiple name="file" onChange={this.setImage} />
                                <button type="button"
                                    className="btn btn-primary"
                                    onClick={this.uploadImageS3}
                                >Picture Upload</button>
                            </div>

                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        onChange={this.handlecheckBoxChange} />
                                      Check me out
          <span className="form-check-sign">
                                        <span className="check"></span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button type="submit"
                            className="btn btn-primary"
                            disabled={!this.state.checked}
                        >Sell</button>
                    </form>
                </Container>
            </div>
        );
    }
}

export default Form;
