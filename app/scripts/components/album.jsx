import React from 'react'
import Router from 'react-router'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'

import Main from './main.jsx'
import Members from './members.jsx'

import events from '../../../data/events.json'

var { PageHeader, ListGroup, Grid, Row, Col, Badge } = bs;
var { Route, DefaultRoute, RouteHandler, Link, Redirect} = Router;
var ListGroupItemLink = rrb.ListGroupItemLink;

let Album = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    var menus = [];
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      var files = ipc.sendSync('request-readdir', event.id);
      menus.push(
        <ListGroupItemLink to="event"
                           params={{eventId: event.id}}>
          {event.title}
          <Badge>{files.length}</Badge>
        </ListGroupItemLink>
      )
    }

    return (
      <Grid>
        <Row>
          <Col sm={3}>
            <ListGroup>{menus}</ListGroup>
          </Col>
          <Col sm={9}>
            <RouteHandler {...this.props}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});
export default Album;
