import React from 'react'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'

import Main from './main.jsx'
import Members from './members.jsx'

var { Grid, Row, Col, NavItem, Nav, Modal, Button } = bs;
var { Carousel, CarouselItem } = bs;
var ListGroupItemLink = rrb.ListGroupItemLink;

let Album = React.createClass({

  getInitialState: function () {
    var dirs = ipc.sendSync('request-readdir', "images/events2/");
    var events = [];

    dirs.forEach(dir => {
      if (!dir.startsWith('.')) {
        events.push(dir);
      }
    });

    return {
      activeKey: 0,
      events: events,
      images: <div />,
      isModalOpen: false,
      imageDir: "images/events2/"
    }
  },

  handleToggle() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  showImage: function (event, files, index) {
    this.handleToggle();
    this.setState({
      event: event,
      files: files,
      selectedIndex: index
    })
  },

  handleSelect: function (selectedKey) {
    const event = this.state.events[selectedKey];
    const baseDir = this.state.imageDir + event;
    var files = ipc.sendSync('request-readdir', baseDir);

    var images = [];
    if (files) {
      for (var i = 0; i < files.length; i++) {
        if (files[i].startsWith('.')) {
          continue;
        }

        images.push(
          <Col>
            <img src={baseDir + "/" + files[i]} width="100%;"/>
          </Col>
        );
        break;
      }
    }

    this.setState({
      activeKey: selectedKey,
      images: images
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
  },
});

export default Album;
