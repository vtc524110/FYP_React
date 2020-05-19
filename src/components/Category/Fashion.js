import React, { Component } from 'react'

class Fashion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [
                { "Men": "Men's Bags & Wallets", "Women": "Women's Bags & Wallets" },
                { "Men": "Men's Accessories", "Women": "Women's Accessories" },
            ]
        }
    }

    renderTableHeader() {
        let header = Object.keys(this.state.students[0])
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    renderTableData() {
        return this.state.students.map((student, index) => {
            const { Men, Women } = student //destructuring
            return (
                <tr key={Men}>
                    <td>{Men}</td>
                    <td>{Women}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <table id='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Fashion;