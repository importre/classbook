import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Row, Col, Glyphicon } = bs;

let Teacher = React.createClass({

  getInitialState: function () {
    var teacher = JSON.parse(ipc.sendSync('read-file', 'data/teacher.json'));
    return {
      teacher: teacher,
      avatars: ipc.sendSync('request-readdir', "images/members/")
    }
  },

  save: function () {
    ipc.on('response-save-file', function (success) {
    });
    ipc.send('request-save-file', 'data/teacher.json', this.state.teacher);
  },

  handleChanged: function () {
    var idx = 0;
    var len = this.state.avatars.length;
    var image = 'images/avatar.svg';
    if (0 <= idx && idx < len) {
      image = this.state.avatars[idx];
    }

    var teacher = {
      name: this.refs.name.getValue(),
      heart: this.refs.heart.getValue(),
      envelope: this.refs.envelope.getValue(),
      image: image
    };

    this.setState({teacher: teacher});
  },

  render: function () {
    return (
      <selction>
        <PageHeader>선생님 설정</PageHeader>

        <Panel bsStyle='info'>
          <Row>
            <Col sm={2}>
              <div className="text-center">
                <img width="70px" height="70px"
                     src={this.state.teacher.image}
                     className="img-circle"/>
              </div>
            </Col>
            <Col sm={10}>
              <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='user'/>}
                     ref='name'
                     onChange={this.handleChanged}
                     value={this.state.teacher.name}/>
              <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='heart'/>}
                     ref='heart'
                     onChange={this.handleChanged}
                     value={this.state.teacher.heart}/>
              <Input bsSize="small" type='textarea' addonBefore={<Glyphicon glyph='envelope'/>}
                     ref='envelope'
                     onChange={this.handleChanged}
                     value={this.state.teacher.envelope}/>
            </Col>
          </Row>
        </Panel>

        <div className='text-right'>
          <Button bsStyle='primary' onClick={this.save}>저장</Button>
        </div>
      </selction>
    );
  }
});

export default Teacher;
