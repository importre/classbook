import React from 'react'
import bs from 'react-bootstrap'

var { Jumbotron, Panel, Grid, Row, Col } = bs;

let Member = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    return (
      <div>
        <Col sm={6}>
          <Panel header={<h1>{this.props.data.name}</h1>} bsStyle='success'>
            <img width="70px" height="70px"
                 src={this.props.data.image}
                 className="img-circle"/>
          </Panel>
        </Col>
      </div>
    );
  }
});

export default Member;
