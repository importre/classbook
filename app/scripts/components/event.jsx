import React from 'react'
import Router from 'react-router'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'

import Main from './main.jsx'
import Members from './members.jsx'

var { PageHeader, ListGroup, Grid, Row, Col, Badge } = bs;
var { Route, DefaultRoute, RouteHandler, Link, Redirect} = Router;
var ListGroupItemLink = rrb.ListGroupItemLink;


let Event = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    var id = this.props.params.eventId;
    var files = ipc.sendSync('request-readdir', id);
    var images = [];
    for (var i = 0; i < files.length; i++) {
      images.push(<Col sm={4}>
        <div className="thumbnail">
          <img src={"images/events/" + id + "/" + files[i]} />
        </div>
      </Col>);
    }
    return (
      <div>
        {images}
      </div>
    );
  }
});

export default Event;
