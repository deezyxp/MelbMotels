import React from 'react'
import {Row, Col, Button} from "reactstrap"

const Home = (props) => {
    return (
        <div>
            <Row noGutters className="text-center align-items-center">
                <Col>
                <p className="looking-for-pho">The Best Pho In Melbourne
                <i className="fas fa-bacon noodle-pic" style={{ fontSize: "2.5rem", color: "black"}}></i>
                </p>
                <Button
                    color="none"
                    className="book-table-btn"
                    onClick={ () => {
                        props.setPage(1)
                    }}>
                    Book Now

                    </Button>
                </Col>
            </Row>
            <Row noGutters className="text-center background-img-container">

                    <Col>
                    <img
                        src={require("../images/pho.jpeg")}
                        alt="pho"
                        className="background-img"
                        />
                    </Col>

            </Row>
        </div>
    )
}

export default Home
