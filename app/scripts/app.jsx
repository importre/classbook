import React from 'react'
import Router from 'react-router'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'
import Main from './components/main.jsx'
import Intro from './components/intro.jsx'
import Members from './components/members.jsx'
import Album from './components/album.jsx'
import Event from './components/event.jsx'
import toolbar from '../../data/toolbar.json'

window.React = React;

var { Navbar, Nav, NavItem } = bs;
var { Route, DefaultRoute, RouteHandler, Link, Redirect} = Router;
var NavItemLink = rrb.NavItemLink;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar brand={<a href="#">{toolbar.title}</a>} inverse>
          <Nav left>
            <NavItemLink to="intro">{toolbar.intro}</NavItemLink>
            <NavItemLink to="members">{toolbar.members}</NavItemLink>
            <NavItemLink to="album">{toolbar.album}</NavItemLink>
          </Nav>
        </Navbar>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="main" handler={Main}/>
    <Route name="intro" handler={Intro}/>
    <Route name="members" handler={Members}/>
    <Route name="album" handler={Album}>
      <Route name="event" path="event/:eventId" handler={Event}/>
      <Redirect from="/album" to="/album/event/0"/>
    </Route>
    <DefaultRoute handler={Main}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});

