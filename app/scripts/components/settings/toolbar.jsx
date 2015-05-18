import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingToolbar = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/toolbar.json'))
  },

  savedMenu: function (result) {
    if (result) {
      ipc.sendSync('reload');
    }
  },

  save: function () {
    var menu = {
      'title': this.refs.title.getValue(),
      'intro': this.refs.intro.getValue(),
      'members': this.refs.members.getValue(),
      'album': this.refs.album.getValue(),
      'settings': 'Settings'
    };

    var valid = true;
    var self = this;
    var checkValidation = function (value, style) {
      var state = {};
      if (!value || !value.trim()) {
        state[style] = 'error';
        valid = false;
      } else {
        state[style] = null;
      }
      self.setState(state);
    };

    checkValidation(menu.title, 'menuTitleStyle');
    checkValidation(menu.intro, 'menuIntroStyle');
    checkValidation(menu.members, 'menuMembersStyle');
    checkValidation(menu.album, 'menuAlbumStyle');

    if (valid) {
      ipc.on('response-save-menu', this.savedMenu);
      ipc.send('request-save-menu', menu);
    }
  },

  handleMenuChanged: function () {
    this.setState({
      'title': this.refs.title.getValue(),
      'intro': this.refs.intro.getValue(),
      'members': this.refs.members.getValue(),
      'album': this.refs.album.getValue()
    })
  },

  render: function () {
    return (
      <selction>
        <PageHeader>메뉴 설정
          <small>: 상단의 메뉴를 설정합니다.</small>
        </PageHeader>

        <form className='form-horizontal'>
          <Input type='text' label='Title' ref='title'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.title}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuTitleStyle}/>
          <Input type='text' label='Intro' ref='intro'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.intro}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuIntroStyle}/>
          <Input type='text' label='Members' ref='members'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.members}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuMembersStyle}/>
          <Input type='text' label='Album' ref='album'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.album}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuAlbumStyle}/>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>
        </form>
      </selction>
    );
  }
});

export default SettingToolbar;
