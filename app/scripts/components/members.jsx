import React from 'react'
import bs from 'react-bootstrap'
import Member from './member.jsx'

var { Glyphicon, Panel, Grid, Row, Col } = bs;

let Members = React.createClass({

  getInitialState: function () {
    var teacher = ipc.sendSync('read-file', 'data/teacher.json');
    var students = ipc.sendSync('read-file', 'data/students.json');
    return {
      teacher: JSON.parse(teacher),
      students: JSON.parse(students)
    };
  },

  render: function () {
    var members = [];
    var size = this.state.students.length;

    for (var i = 0; i < size; i++) {
      var student = this.state.students[i];
      if (!student.image) {
        student.image= 'images/avatar.svg';
      }
      members.push(
        <Member data={student}/>
      );
    }

    var envelope = this.state.teacher.envelope || '';
    var html = envelope.replace(/\n/g, "<br/>");
    var image = this.state.teacher.image || 'images/avatar.svg';

    return (
      <div>
        <div className="container">
          <Panel header={<h1>{this.state.teacher.name}</h1>} bsStyle='info'>
            <Row>
              <Col sm={2}>
                <div className="text-center">
                  <img width="70px" height="70px"
                       src={image}
                       className="img-circle"/>
                </div>
              </Col>
              <Col sm={10}>
                <Row>
                  <Col xs={1}><Glyphicon glyph='heart'/></Col>
                  <Col xs={11}>{this.state.teacher.heart}</Col>
                </Row>
                <Row>
                  <Col xs={1}><Glyphicon glyph='envelope'/></Col>
                  <Col xs={11}><span dangerouslySetInnerHTML={{__html:  html}}></span></Col>
                </Row>
              </Col>
            </Row>
          </Panel>
          <Row>
            {members}
          </Row>
        </div>
      </div>
    );
  }
});

export default Members;
