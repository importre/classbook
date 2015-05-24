import React from 'react'
import bs from 'react-bootstrap'
import Teacher from './members/teacher.jsx'
import Students from './members/students.jsx'

var { PageHeader, Button } = bs;

let SettingMembers = React.createClass({

  getInitialState: function () {
    return {}
  },

  handleChanged: function () {
    this.setState({});
  },

  handleMemberChanged: function (id) {
  },

  openMembers: function () {
    ipc.sendSync('open-dir', 'images/members');
  },

  render: function () {
    return (
      <selction>
        <PageHeader>프로필 사진 설정
          <small>: 프로필 사진을 넣으세요. 선생님부터 이름 순서대로 자동으로 들어갑니다.</small>
        </PageHeader>

        <Button bsStyle='primary'
                style={{'marginBottom': '10px'}}
                onClick={this.openMembers}>멤버 폴더 열기</Button>

        <Teacher/>
        <Students/>
      </selction>
    );
  }
});

export default SettingMembers;
