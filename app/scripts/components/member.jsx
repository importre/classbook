import React from 'react'
import bs from 'react-bootstrap'

var { Glyphicon, Panel, Grid, Row, Col } = bs;

let Member = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    var envelope = this.props.data.envelope || '';
    var html = envelope.replace(/\n/g, "<br/>");

    return (
      <div>
        <Col sm={6} md={4}>
          <Panel header={<h1>{this.props.data.name}</h1>} bsStyle='success'>
            <Row>
              <Col sm={3}>
                <div className="text-center">
                  <img width="70px" height="70px"
                       src={this.props.data.image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={9}>
                <p>
                  <Glyphicon glyph='user'/> {this.props.data.name}
                </p>

                <p>
                  <Glyphicon glyph='heart'/> {this.props.data.heart}
                </p>
                <p>
                  <Glyphicon glyph='envelope'/>

                  <div dangerouslySetInnerHTML={{__html:  html}}></div>
                </p>
              </Col>
            </Row>
          </Panel>
        </Col>
      </div>
    );
  }
});

export default Member;
