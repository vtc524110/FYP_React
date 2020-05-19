import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Bidding extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        // Remove the 'www.' to cause a CORS error (and see the error state)
        axios.get("http://desmond.business:8080/fyp/getBiddings")
            .then(res => {
                // Transform the raw data by extracting the nested posts
                
                const posts = res.data.results.map(obj => [obj.id, obj.title]);
                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
                this.setState({
                    posts,
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

    render() {
        return (
            <div>
                <h6>Bidding records</h6>
                {this.state.loading ?
                    this.renderLoading()
                    : this.renderPosts()}
            </div>
        );
    }
}

// Change the subreddit to anything you like
export default Bidding;
