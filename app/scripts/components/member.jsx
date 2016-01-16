import React from 'react'
import bs from 'react-bootstrap'

var { Glyphicon, Panel, Grid, Row, Col } = bs;

const width= '100px';
const height = '100px';

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
              <Col sm={4}>
                <div className="text-center">
                  <img width={width} height={height}
                       src={this.props.data.image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={8}>
                <Row>
                  <Col xs={2}><Glyphicon glyph='heart'/></Col>
                  <Col xs={10}>{this.props.data.heart}</Col>
                </Row>
                <Row>
                  <Col xs={2}><Glyphicon glyph='envelope'/></Col>
                  <Col xs={10}><span dangerouslySetInnerHTML={{__html:  html}}></span></Col>
                </Row>
              </Col>
            </Row>
          </Panel>
        </Col>
      </div>
    );
  }
});

export default Member;
