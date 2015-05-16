import React from 'react'
import bs from 'react-bootstrap'
import SettingToolbar from './settings/toolbar.jsx'
import SettingMain from './settings/main.jsx'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let Settings = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    return (
      <div className='container'>

        <SettingToolbar />
        <SettingMain />
      </div>
    );
  }
});

export default Settings;
