  
import React from "react";
import { Row, Col } from "reactstrap";

export default () => {
  return (
    <div>
      <Row noGutters className="text-center">
        <Col>
          <p className="thanks-header">Thank You!</p>
          <i className="fas fa-bacon thank-you-pho"></i>
          <p className="thanks-subtext">
            Please check your email to confirm your reservation, we look forward to seeing you at PhoTastic!
          </p>
        </Col>
      </Row>
    </div>
  );
};