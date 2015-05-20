import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col, Glyphicon } = bs;

let Students = React.createClass({

  getInitialState: function () {
    var students = JSON.parse(ipc.sendSync('read-file', 'data/students.json'));
    return {
      numOfStudents: students.length,
      students: students,
      avatars: ipc.sendSync('request-readdir', "images/members/")
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
    var len = this.state.avatars.length;
    var idx = id + 1;
    var image = 'images/avatar.svg';
    if (0 <= idx && idx < len) {
      image = this.state.avatars[idx];
    }

    var students = this.state.students;
    students[id] = {
      name: this.refs['studentName' + id].getValue(),
      heart: this.refs['studentHeart' + id].getValue(),
      envelope: this.refs['studentEnvelope' + id].getValue(),
      image: image
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
      for (i = 0; i < -n; i++)
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

export default Students;
