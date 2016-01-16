import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col, Glyphicon } = bs;

const width= '100px';
const height = '100px';

let Students = React.createClass({

  getInitialState: function () {
    var students = JSON.parse(ipc.sendSync('read-file', 'data/students.json'));
    var avatars = ipc.sendSync('request-readdir', "images/members/");
    if (avatars.length > 1) {
      avatars.splice(0, 1);
    }

    var min  = students.length > avatars.length ? avatars.length : students.length;
    for (var i = 0; i < min; i++) {
      students[i].image = 'images/members/' + avatars[i];
    }

    return {
      numOfStudents: students.length,
      students: students,
      avatars: avatars
    }
  },

  save: function () {
    ipc.on('response-save-file', function (success) {
    });
    ipc.send('request-save-file', 'data/students.json', this.state.students);
  },

  handleChanged: function () {
    this.setState({
      numOfStudents: this.refs.numOfStudents.getValue()
    });
  },

  handleMemberChanged: function (id) {
    var students = this.state.students;
    students[id] = {
      name: this.refs['studentName' + id].getValue(),
      heart: this.refs['studentHeart' + id].getValue(),
      envelope: this.refs['studentEnvelope' + id].getValue(),
      image: students[id].image
    };
    this.setState({students: students});
  },

  applyNumOfStudents: function () {
    var students = this.state.students;
    var after = this.refs.numOfStudents.getValue();
    var before = this.state.students.length;
    var i, n = before - after;
    if (n > 0) {
      for (i = 0; i < n; i++)
        students.pop();
    } else {
      for (i = 0; i < -n; i++) {
        var size = students.length;
        var image = 'images/avatar.svg';
        if (this.state.avatars.length > size) {
          image = 'images/members/' + this.state.avatars[size];
        }
        students.push({
          name: '',
          heart: '',
          envelop: '',
          image: image
        });
      }
    }
    this.setState({
      students: students
    });
  },

  render: function () {
    var saveButton = null;
    if (this.state.numOfStudents > 0) {
      saveButton = <Button bsStyle='primary' onClick={this.save}>저장</Button>;
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
              <Col sm={4}>
                <div className="text-center">
                  <img width={width} height={height}
                       src={this.state.students[i].image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={8}>{i1} {i2} {i3}</Col>
            </Row>
          </Panel>
        </Col>
      );
    }

    return (
      <selction>
        <PageHeader>학생들 설정
          <small>: 학생 수 설정 -> 적용 -> 학생 내용 작성 -> 저장</small>
        </PageHeader>

        <Grid>
          <Row
            >
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

export default Students;
