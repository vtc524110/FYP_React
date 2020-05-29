import React from 'react'
//import axios from 'axios';

class CategoryTable extends React.Component {
    constructor(props) {
        super(props)
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }

    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    getRowsData = function () {
        var items = this.props.data;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
        })
    }


    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        const ref = props.data[key].replace(/\s/g,'')
        return <td key={props.data[key]}><a href={ref}>{props.data[key]}</a></td>
    })
}
export default CategoryTable;