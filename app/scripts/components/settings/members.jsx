import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col, Glyphicon } = bs;

let SettingMembers = React.createClass({

  getInitialState: function () {
    var students = JSON.parse(ipc.sendSync('read-file', 'data/students.json'));
    var teacher = JSON.parse(ipc.sendSync('read-file', 'data/teacher.json'));
    return {
      numOfStudents: students.length,
      studentComponents: [],
      students: students,
      teacher: teacher,
      avatars: ipc.sendSync('request-readdir', "images/members/")
    }
  },

  handleChanged: function () {
    this.setState({
      numOfStudents: this.refs.numOfStudents.getValue()
    });
  },

  handleMemberChanged: function (id) {
    var len = this.state.avatars.length;
    var idx = id + 1;
    var image = 'images/avatar.svg';
    if (0 <= idx && idx < len) {
      image = this.state.avatars[idx];
    }

    if (id < 0) {
      var teacher = {
        name: this.refs.teacherName.getValue(),
        heart: this.refs.teacherHeart.getValue(),
        envelope: this.refs.teacherEnvelope.getValue(),
        image: image
      };

      this.setState({teacher: teacher});
    } else {
      var students = this.state.students;
      students[id] = {
        name: this.refs['studentName' + id].getValue(),
        heart: this.refs['studentHeart' + id].getValue(),
        envelope: this.refs['studentEnvelope' + id].getValue(),
        image: image
      };
      this.setState({students: students});
    }
  },

  openMembers: function () {
    ipc.sendSync('open-members-dir');
  },

  applyNumOfStudents: function () {
    var students = this.state.students;
    var after = this.refs.numOfStudents.getValue();
    var before = this.state.students.length;
    var n = before - after;
    if (n > 0) {
      for (var i = 0; i < n; i++)
        students.pop();
    } else {
      for (var i = 0; i < -n; i++)
        students.push({
          name: '',
          heart: '',
          envelop: '',
          image: 'images/avatar.svg'
        });
    }
    this.setState({
      students: students
    });
  },

  render: function () {
    var saveButton = null;
    if (this.state.numOfStudents > 0) {
      saveButton = <Button bsStyle='primary' onClick={this.saveStudents}>저장</Button>;
    }

    var components = [];
    for (var i = 0; i < this.state.students.length; i++) {
      var i1 = <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='user'/>}
                      ref={'studentName' + i}
                      onChange={this.handleMemberChanged.bind(this, i)}
                      value={this.state.students[i].name}/>;
      var i2 = <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='heart'/>}
                      ref={'studentHeart' + i}
                      onChange={this.handleMemberChanged.bind(this, i)}
                      value={this.state.students[i].heart}/>;
      var i3 = <Input bsSize="small" type='textarea' addonBefore={<Glyphicon glyph='envelope'/>}
                      ref={'studentEnvelope' + i}
                      onChange={this.handleMemberChanged.bind(this, i)}
                      value={this.state.students[i].envelope}/>;
      components.push(
        <Col sm={6} md={4} key={'student' + i}>
          <Panel bsStyle='success'>
            <Row>
              <Col sm={3}>
                <div className="text-center">
                  <img width="70px" height="70px"
                       src={this.state.students[i].image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={9}>{i1} {i2} {i3}</Col>
            </Row>
          </Panel>
        </Col>
      );
    }

    return (
      <selction>
        <PageHeader>프로필 사진 설정</PageHeader>

        <Row>
          <Col sm={3}>
            <Button bsStyle='primary'
                    style={{'margin-bottom': '10px'}}
                    onClick={this.openMembers}>멤버 폴더 열기</Button>
          </Col>
          <Col sm={9}>
            프로필 사진을 넣으세요. 선생님부터 이름 순서대로 자동으로 들어갑니다.
          </Col>
        </Row>

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
                     ref='teacherName'
                     onChange={this.handleMemberChanged.bind(this, -1)}
                     value={this.state.teacher.name}/>
              <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='heart'/>}
                     ref='teacherHeart'
                     onChange={this.handleMemberChanged.bind(this, -1)}
                     value={this.state.teacher.heart}/>
              <Input bsSize="small" type='textarea' addonBefore={<Glyphicon glyph='envelope'/>}
                     ref='teacherEnvelope'
                     onChange={this.handleMemberChanged.bind(this, -1)}
                     value={this.state.teacher.envelope}/>
            </Col>
          </Row>
        </Panel>

        <div className='text-right'>
          <Button bsStyle='primary' onClick={this.saveTeacher}>저장</Button>
        </div>

        <PageHeader>학생들 설정</PageHeader>

        <Grid>
          <Row>
            <Col sm={3}>
              <Input type='number' ref='numOfStudents'
                     addonBefore='학생 수'
                     min='0' max='50'
                     value={this.state.numOfStudents}
                     onChange={this.handleChanged}/>
            </Col>
            <Col sm={1}>
              <Button onClick={this.applyNumOfStudents}
                      bsStyle='primary'>
                적용
              </Button>
            </Col>
          </Row>
        </Grid>

        <Grid>{components}</Grid>

        <div className='text-right'>{saveButton}</div>
      </selction>
    );
  }
});

export default SettingMembers;
