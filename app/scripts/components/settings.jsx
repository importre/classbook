import React from 'react'
import bs from 'react-bootstrap'
import SettingToolbar from './settings/toolbar.jsx'
import SettingMain from './settings/main.jsx'
import SettingAlbum from './settings/album.jsx'

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
        <SettingAlbum />
      </div>
    );
  }
});

export default Settings;
