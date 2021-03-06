import React from 'react'
import bs from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'

var { PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingToolbar = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/toolbar.json'));
  },

  savedMenu: function (result) {
    if (result) {
      ipc.sendSync('reload');
    }
  },

  handleStartDateChange: function (date) {
    this.setState({
      date: date.toISOString()
    });
  },

  save: function () {
    var menu = {
      'title': this.refs.title.getValue(),
      'intro': this.refs.intro.getValue(),
      'members': this.refs.members.getValue(),
      'album': this.refs.album.getValue(),
      'movie': this.refs.movie.getValue(),
      'album2': this.refs.album2.getValue(),
      'date': this.state.date,
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
    checkValidation(menu.movie, 'menuMovieStyle');
    checkValidation(menu.album2, 'menuAlbumStyle');

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
      'album': this.refs.album.getValue(),
      'movie': this.refs.movie.getValue(),
      'album2': this.refs.album2.getValue()
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
          <Input type='text' label='Movie' ref='movie'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.movie}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuAlbumStyle}/>
          <Input type='text' label='Album2' ref='album2'
                 labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                 value={this.state.album2}
                 onChange={this.handleMenuChanged}
                 bsStyle={this.state.menuAlbumStyle}/>

          <PageHeader>D-Day 설정
            <small>: 헤어질 날을 설정합니다.</small>
          </PageHeader>

          <DatePicker
            weekStart="0"
            selected={moment(this.state.date)}
            onChange={this.handleStartDateChange}/>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>
        </form>
      </selction>
    );
  }
});

export default SettingToolbar;
