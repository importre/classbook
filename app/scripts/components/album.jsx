import React from 'react'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'

import Main from './main.jsx'
import Members from './members.jsx'

var { Grid, Row, Col, NavItem, Nav, Modal, Button, OverlayMixin } = bs;
var { Carousel, CarouselItem } = bs;
var ListGroupItemLink = rrb.ListGroupItemLink;

let Album = React.createClass({

  mixins: [OverlayMixin],

  getInitialState: function () {
    var dirs = ipc.sendSync('request-readdir', "images/events/");
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
      imageDir: "images/events/"
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
    for (var i = 0; i < files.length; i++) {
      if (files[i].startsWith('.')) {
        continue;
      }

      images.push(
        <Col sm={4}>
          <div className="thumbnail"
               onClick={this.showImage.bind(this, event, files, i)}>
            <img src={baseDir + "/" + files[i]}/>
          </div>
        </Col>
      );
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

  handleCarousel: function (selectedIndex, selectedDirection) {
    this.setState({
      selectedIndex: selectedIndex,
      direction: selectedDirection
    });
  },

  renderOverlay() {
    if (!this.state.isModalOpen) {
      return <span/>;
    }

    var files = this.state.files;
    var index = this.state.selectedIndex;

    var items = [];
    for (var i = 0; i < files.length; i++) {
      var src = this.state.imageDir + this.state.event + "/" + files[index];
      var item =
        <CarouselItem>
          <div className="text-center carousel-img">
            <img width='100%' src={src}/>
          </div>
        </CarouselItem>;
      items.push(item);
    }

    return (
      <Modal title={this.state.event} onRequestHide={this.handleToggle} bsSize="large">
        <div className='modal-body'>
          <Carousel activeIndex={this.state.selectedIndex}
                    direction={this.state.direction}
                    id='carousel-album'
                    onSelect={this.handleCarousel}>
            {items}
          </Carousel>
        </div>
        <div className='modal-footer'>
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

export default Album;
