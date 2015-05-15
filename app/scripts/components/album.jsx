import React from 'react'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'

import Main from './main.jsx'
import Members from './members.jsx'

var { Grid, Row, Col, NavItem, Nav } = bs;
var ListGroupItemLink = rrb.ListGroupItemLink;

let Album = React.createClass({

  getInitialState: function () {
    return {
      "activeKey": 0,
      "events": ipc.sendSync('request-readdir', ''),
      "images": <div />
    }
  },

  handleSelect: function (selectedKey) {
    const event = this.state.events[selectedKey];
    var files = ipc.sendSync('request-readdir', event);
    var images = [];
    for (var i = 0; i < files.length; i++) {
      images.push(
        <Col sm={4}>
          <div className="thumbnail">
            <img src={"images/events/" + event + "/" + files[i]}/>
          </div>
        </Col>
      );
    }

    this.setState({
      "activeKey": selectedKey,
      "images": images
    });
  },

  componentDidMount: function () {
    this.handleSelect(0);
  },

  render: function () {
    var menus = [];
    for (var i = 0; i < this.state.events.length; i++) {
      var event = this.state.events[i];
      menus.push(
        <NavItem eventKey={i}>{event}</NavItem>
      )
    }

    return (
      <Grid>
        <Row>
          <Col sm={3}>
            <Nav bsStyle='pills'
                 stacked activeKey={this.state.activeKey}
                 onSelect={this.handleSelect}>
              {menus}
            </Nav>
          </Col>
          <Col sm={9}>
            {this.state.images}
          </Col>
        </Row>
      </Grid>
    );
  }
});

export default Album;
