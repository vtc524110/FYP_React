import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import S3 from 'react-aws-s3';

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

class Biddings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            catalogue: [],
            currentIndex: 0,
            itemShow: 3,
            random: 0,
            loading: true,
            error: null,
            token: "",
            file:""
        };
    }

    upload(e) {
        console.log(e.target.files[0]);
    }

    uploadImageS3 = (e) => {


        const ReactS3Client = new S3(config);
        /*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */

        /* This is optional */
        const newFileName = 'test-file';
        console.log(e.target.files[0]);
        ReactS3Client
            .uploadFile(e.target.files[0],newFileName)
            .then(data => console.log(data))
            .catch(err => console.error(err))

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

    fetchToken = async () => {
 
        const res = await axios.post('http://desmond.business:8080/fyp/authenticate', {
            "username": "des123",
            "password": "password"
        })
        return res;
    }
    fetchBiddings = async () => {
/*
        const authUrl = 'http://desmond.business:8080/fyp/authenticate';
        const getBiddingsUrl = 'http://desmond.business:8080/fyp/getBiddings';
        let userAuth = {
            "username": "des123",
            "password": "password"
        };
        axios.post(authUrl, userAuth).then(response => {
            console.log(response.data.token);
            let config = {
                headers: {
                    "Authorization": `Bearer${response.data.token}`
                }
            }
            console.log(config);
            axios.get(getBiddingsUrl, config).then(result => {
                console.log(result);
            }            
            ).catch(err => {
                console.log(err);
            })
        })
       */

    axios.get("http://desmond.business:8080/fyp/getBiddings")
        .then(res => {
            // Transform the raw data by extracting the nested posts
            const updateCatalogue = this.state.catalogue
            const posts = res.data.results;
            for (var i = 0; i < this.state.itemShow; i++) {
                //console.log(this.state.itemSHow)
                //console.log("i=" + i)
                const min = 0;
                const max = posts.length;
                const rand = parseInt(min + Math.random() * (max - min))

                //console.log("rand" + rand)
                updateCatalogue.push(
                    <Col key={posts[rand].id} className="col-md-4">
                        <Card style={{ width: '20rem' }}>
                            <CardImg top src={require("assets/img/mac_apple.jpg")} alt="..." />
                            <CardBody>
                                <CardTitle>{posts[rand].title}</CardTitle>
                                <CardText>{posts[rand].create_timestamp}</CardText>
                                <Link to={`/CarsforSale/${posts[rand].id}`}>
                                    <Button color="primary">
                                        ${posts[rand].selling_price}
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                )
            }
            //console.log(this.state.catalogue);
            //console.log(posts);
            // Update state to trigger a re-render.
            // Clear any errors, and turn off the loading indiciator.
            this.setState({
                posts,
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

    componentDidMount() {
        // Remove the 'www.' to cause a CORS error (and see the error state)
        this.fetchBiddings()
    }

    showMore = () => {
        this.fetchBiddings()
        //console.log(this.state.catalogue);
        //console.log(this.state.currentIndex);
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

        //console.log(this.state.posts[0]);
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
                                        <input
                                            type="file"
                                            onChange={this.uploadImageS3}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                <Spinner animation="border" variant="primary" />
                            </div>

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
                                        <h1 className="bd-title">{this.props.title}</h1>
                                    </div>
                                </Col>
                            </Row>
                            <CardBody>
                                <Row>
                                    {catalogue}
                                </Row>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            );
        }
    }
}

export default Biddings;