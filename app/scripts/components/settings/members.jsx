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
      teacher: teacher
    }
  },

  componentDidMount: function () {
    this.applyNumOfStudents();
  },

  handleChanged: function () {
    this.setState({
      numOfStudents: this.refs.numOfStudents.getValue()
    });
  },

  openMembers: function () {
    ipc.sendSync('open-members-dir');
  },

  applyNumOfStudents: function () {
    var components = [];
    for (var i = 0; i < this.state.numOfStudents; i++) {
      components.push(
        <Col sm={6} md={4}>
          <Panel bsStyle='success'>
            <Row>
              <Col sm={3}>
                <div className="text-center">
                  <img width="70px" height="70px"
                       src={this.state.students[i].image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={9}>
                <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='user'/>}
                       ref={'studentName' + i}
                       value={this.state.students[i].name}/>
                <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='heart'/>}
                       ref={'studentHeart' + i}
                       value={this.state.students[i].heart}/>
                <Input bsSize="small" type='textarea' addonBefore={<Glyphicon glyph='envelope'/>}
                       ref={'studentEnvelope' + i}
                       value={this.state.students[i].envelope}/>
              </Col>
            </Row>
          </Panel>
        </Col>
      );
    }

    this.setState({
      studentsComponents: components
    });
  },

  render: function () {
    var students = null;
    if (this.state.numOfStudents > 0) {
      students = <Button bsStyle='primary' onClick={this.saveStudents}>저장</Button>;
    }

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
                     ref='teacherName'
                     value={this.state.teacher.name}/>
              <Input bsSize="small" type='text' addonBefore={<Glyphicon glyph='heart'/>}
                     ref='teacherHeart'
                     value={this.state.teacher.heart}/>
              <Input bsSize="small" type='textarea' addonBefore={<Glyphicon glyph='envelope'/>}
                     ref='teacherEnvelope'
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
            <Col sm={1}>
              <div className='text-right'>
                <Button bsStyle='primary' onClick={this.openMembers}>멤버 폴더 열기</Button>
              </div>
            </Col>
          </Row>
        </Grid>

        <Row>{this.state.studentsComponents}</Row>

        <div className='text-right'>{students}</div>
      </selction>
    );
  }
});

export default SettingMembers;
