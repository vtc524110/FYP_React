import React from 'react'
import axios from 'axios';
import CategoryTable from './CategoryTable.js'
import Spinner from 'react-bootstrap/Spinner'
import CarsProperty from './CarsProperty.js';

class Other extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            error: null,
            data: [],
            category: "Other",
            category_second_lv_name: null,
            fetch: "http://desmond.business:8080/fyp/getCategoryFirstLvs"
        }
    }

    componentDidMount() {
        this.setState({
            data: [],
            loading: true,
            error: null
        })

        axios.get(this.state.fetch)
            .then(res => {
                // Transform the raw data by extracting the nested posts

                const posts = res.data.results;
                //console.log(posts);
                // Update state to trigger a re-render.
                // Clear any errors, and turn off the loading indiciator.
         
                posts.forEach((elm) => {
           
   
                    if (elm.category_first_lv_name == this.state.category) {
                 
                        for (var i = 0; i < elm.theCategorySecondLvs.length; i++) {
                      
                            for (var k = 0; k < elm.theCategorySecondLvs[i].theCategoryThirdLvLv.length; k++) {
                          
                                let mapping = {}
                    
                                if (elm.theCategorySecondLvs[i].theCategoryThirdLvLv.length<=1){
                              
                                    mapping[elm.theCategorySecondLvs[i].category_second_lv_name] = elm.theCategorySecondLvs[i].theCategoryThirdLvLv[k].category_third_lv_name    
                                } else {

                                for (var j =0 ; j <elm.theCategorySecondLvs.length;j++){
                                
                                    mapping[elm.theCategorySecondLvs[j].category_second_lv_name] = elm.theCategorySecondLvs[j].theCategoryThirdLvLv[k].category_third_lv_name
                                }
                      
                            }
                    
                            this.state.data.push(mapping)
                            }

                        }
                    }
                })

                this.setState({
                    loading: false
                })
            })
            .catch(err => {
                // Something went wrong. Save the error in state and re-render.
                this.setState({
                    loading: false,
                    error: err
                });
            })
    }

    isLoading = () => {
        return this.state.loading
    }

    dataisNull = () => {
        return this.state.data == null
    }

    render() {
        const { data, loading } = this.state;

        if (this.state.loading) {
            return (
                <div>
                    <Spinner animation="border" variant="primary" />
                </div>
            )
        } else {
            return (
                <div>
                   <CategoryTable data={data} />
                </div>
            )
        }
    }
}

export default Other;