import React from 'react'
import bs from 'react-bootstrap'
import SettingToolbar from './settings/toolbar.jsx'
import SettingMain from './settings/main.jsx'
import SettingAlbum from './settings/album.jsx'
import SettingIntro from './settings/intro.jsx'
import SettingMembers from './settings/members.jsx'
import SettingAlbum2 from './settings/album2.jsx'
import SettingHelp from './settings/help.jsx'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col, TabbedArea, TabPane } = bs;

let Settings = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    return (
      <div className='container bottom'>
        <TabbedArea defaultActiveKey={1} animation={false}>
          <TabPane eventKey={1} tab='메뉴 설정'>
            <SettingToolbar />
          </TabPane>
          <TabPane eventKey={2} tab='메인 설정'>
            <SettingMain />
          </TabPane>
          <TabPane eventKey={3} tab='소개 설정'>
            <SettingIntro/>
          </TabPane>
          <TabPane eventKey={4} tab='학급 프로필 설정'>
            <SettingMembers />
          </TabPane>
          <TabPane eventKey={5} tab='앨범 설정'>
            <SettingAlbum />
          </TabPane>
          <TabPane eventKey={6} tab='앨범2 설정'>
            <SettingAlbum2 />
          </TabPane>
          <TabPane eventKey={7} tab='도움말'>
            <SettingHelp />
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
});

export default Settings;
