import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingAlbum = React.createClass({

  openImageAlbum: function () {
    ipc.sendSync('open-dir', 'images/events2');
  },

  openVideoAlbum: function () {
    ipc.sendSync('open-dir', 'movies');
  },

  render: function () {
    return (
      <selction>
        <PageHeader>사진 앨범2 설정
          <small>: 폴더를 열어서 사진을 넣으세요.</small>
        </PageHeader>

        <Button bsStyle='primary' onClick={this.openImageAlbum}>폴더 열기</Button>
      </selction>
    );
  }
});

export default SettingAlbum;
