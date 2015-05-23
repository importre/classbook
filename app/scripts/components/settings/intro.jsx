import React from 'react'
import bs from 'react-bootstrap'
import marked from 'marked'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingIntro = React.createClass({

  getInitialState: function () {
    var data = JSON.parse(ipc.sendSync('read-file', 'data/intro.json'));
    data.msgPreview = marked(data.msg, {sanitize: true});
    data.etcPreview = marked(data.etc, {sanitize: true});
    return data;
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
    checkValidation(this.state.msg, 'messageStyle');

    if (valid) {
      ipc.on('response-save-file', this.saved);

      this.state.msgPreview = null;
      this.state.etcPreview = null;
      ipc.send('request-save-file', 'data/intro.json', this.state);
    }
  },

  handleChanged: function () {
    var msg = this.refs.msg.getValue();
    var etc = this.refs.etc.getValue();

    this.setState({
      motto: this.refs.motto.getValue(),
      msg: this.refs.msg.getValue(),
      etc: etc,
      msgPreview: marked(msg, {sanitize: true}),
      etcPreview: marked(etc, {sanitize: true})
    });
  },

  render: function () {
    return (
      <selction>
        <PageHeader>소개 설정
          <small>: 급훈 및 선생님 말씀을 작성합니다.</small>
        </PageHeader>

        <form className='form-horizontal'>
          <Row>
            <Col sm={12}>
              <Input type='text' label='급훈' ref='motto'
                     labelClassName='col-sm-1' wrapperClassName='col-sm-11'
                     value={this.state.motto}
                     onChange={this.handleChanged}
                     bsStyle={this.state.mottoStyle}/>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type='textarea' label='메시지' ref='msg'
                     labelClassName='col-sm-2' wrapperClassName='col-sm-10'
                     rows='10'
                     value={this.state.msg}
                     onChange={this.handleChanged}
                     bsStyle={this.state.messageStyle}/>
            </Col>
            <Col sm={6}>
              <div dangerouslySetInnerHTML={{__html:  this.state.msgPreview}}></div>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type='textarea' label='기타' ref='etc'
                     labelClassName='col-sm-2' wrapperClassName='col-sm-10'
                     rows='20'
                     value={this.state.etc}
                     onChange={this.handleChanged}/>
            </Col>
            <Col sm={6}>
              <div dangerouslySetInnerHTML={{__html:  this.state.etcPreview}}></div>
            </Col>
          </Row>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>
        </form>
      </selction>
    );
  }
});

export default SettingIntro;
