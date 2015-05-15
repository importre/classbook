import React from 'react'
import bs from 'react-bootstrap'
import Member from './member.jsx'
import teacher from '../../../data/teacher.json'
import students from '../../../data/students.json'

var { Jumbotron, Panel, Grid, Row, Col } = bs;

let Members = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    var members = [];
    var max = students.length;
    for (var i = 0; i < max; i += 2) {
      if (i == max - 1 && max % 2 == 1) {
        members.push(
          <Row className='show-grid'>
            <Member data={students[i]}/>
          </Row>
        );
      } else {
        members.push(
          <Row className='show-grid'>
            <Member data={students[i]}/>
            <Member data={students[i + 1]}/>
          </Row>
        );
      }
    }

    return (
      <div>
        <div className="container">
          <Panel header={<h1>{teacher.name}</h1>} bsStyle='info'>
            <img width="70px" height="70px"
                 src={teacher.image}
                 className="img-circle"/>
          </Panel>
          {members}
        </div>
      </div>
    );
  }
});

export default Members;
