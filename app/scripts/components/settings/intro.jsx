import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingIntro = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/intro.json'))
  },

  saved: function (success) {
    console.log(success);
  },

  save: function () {
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

    checkValidation(this.state.motto, 'mottoStyle');
    checkValidation(this.state.message, 'messageStyle');

    if (valid) {
      ipc.on('response-save-file', this.saved);
      ipc.send('request-save-file', 'data/intro.json', this.state);
    }
  },

  handleChanged: function () {
    this.setState({
      motto: this.refs.motto.getValue(),
      message: this.refs.message.getValue()
    })
  },

  render: function () {
    return (
      <selction>
        <PageHeader>소개 설정
          <small>: 교훈 및 선생님 말씀을 작성합니다.</small>
        </PageHeader>

        <form className='form-horizontal'>
          <Input type='text' label='Motto' ref='motto'
                 labelClassName='col-xs-1' wrapperClassName='col-xs-11'
                 value={this.state.motto}
                 onChange={this.handleChanged}
                 bsStyle={this.state.mottoStyle}/>
          <Input type='textarea' label='Message' ref='message'
                 labelClassName='col-xs-1' wrapperClassName='col-xs-11'
                 rows='10'
                 value={this.state.message}
                 onChange={this.handleChanged}
                 bsStyle={this.state.messageStyle}/>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>
        </form>
      </selction>
    );
  }
});

export default SettingIntro;
