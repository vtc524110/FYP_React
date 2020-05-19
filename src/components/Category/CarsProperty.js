import React from 'react'

class CarsProperty extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [
                { car: 'Cars for Sale', property: 'Industrial property' },
                { car: 'Vehicle Rentals', property: 'Rentals' },
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
            const { car, property } = student //destructuring
            return (
                <tr key={car}>
                    <td><a href="/CarsForSale">{car}</a></td>
                    <td>{property}</td>
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

export default CarsProperty;