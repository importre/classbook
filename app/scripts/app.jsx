import React from 'react'
import Router from 'react-router'
import bs from 'react-bootstrap'
import rrb from 'react-router-bootstrap'
import Main from './components/main.jsx'
import Intro from './components/intro.jsx'
import Members from './components/members.jsx'
import Album from './components/album.jsx'
import Settings from './components/settings.jsx'

window.React = React;

var { Navbar, Nav, NavItem } = bs;
var { Route, DefaultRoute, RouteHandler, Link, Redirect} = Router;
var NavItemLink = rrb.NavItemLink;

var App = React.createClass({

  getInitialState: function () {
    var json = JSON.parse(ipc.sendSync('read-file', 'data/toolbar.json'));
    return {
      "toolbar": json,
      "editMode": false
    }
  },

  toggleEditMode: function (editMode) {
    this.setState({
      "editMode": editMode
    });
  },

  componentDidMount: function () {
    ipc.on('editmode', this.toggleEditMode);
  },

  render: function () {
    var settings = null;
    if (this.state.editMode) {
      settings = <NavItemLink to="settings">{this.state.toolbar.settings}</NavItemLink>;
    }

    return (
      <div>
        <Navbar brand={<a href="#">{this.state.toolbar.title}</a>} inverse>
          <Nav left>
            <NavItemLink to="intro">{this.state.toolbar.intro}</NavItemLink>
            <NavItemLink to="members">{this.state.toolbar.members}</NavItemLink>
            <NavItemLink to="album">{this.state.toolbar.album}</NavItemLink>
          </Nav>
          <Nav right>
            {{settings}}
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
    <Route name="album" handler={Album}/>
    <Route name="settings" handler={Settings}/>
    <DefaultRoute handler={Main}/>
  </Route>
);

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.body);
});

