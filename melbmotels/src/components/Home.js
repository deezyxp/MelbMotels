import React from 'react'
import {Row, Col, Button} from "reactstrap"

const Home = (props) => {
    return (
        <div>
            <Row noGutters className="text-center align-items-center pho-cta">
                <Col>
                <p className="looking-for-pho">If you're looking for great pho
                <i className="fas fa-bacon noodle-pic" style={{ fontSize: "3rem", color: "black"}}></i>
                </p>
                <Button
                    color="none"
                    className="book-table-btn"
                    onClick={ () => {
                        props.setPage(1)
                    }}>
                    Book a Table

                    </Button>
                </Col>
            </Row>
            <Row noGutters className="text-center big-img-container">

                    <Col>
                    <img
                        src={require("../images/pho.jpeg")}
                        alt="pho"
                        className="big-img"
                        />
                    </Col>

            </Row>
        </div>
    )
}

export default Home
