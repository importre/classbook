import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingAlbum = React.createClass({

  openImageAlbum: function () {
    ipc.sendSync('open-image-album-dir');
  },

  openVideoAlbum: function () {
    ipc.sendSync('open-video-album-dir');
  },

  render: function () {
    return (
      <selction>
        <PageHeader>사진 앨범 설정
          <small>: 폴더를 열어서 사진을 넣으세요.</small>
        </PageHeader>

        <Button bsStyle='primary' onClick={this.openImageAlbum}>폴더 열기</Button>

        <PageHeader>동영상 앨범 설정
          <small>: 폴더를 열어서 동영상을 넣으세요.</small>
        </PageHeader>

        <Button bsStyle='primary' onClick={this.openVideoAlbum}>폴더 열기</Button>
      </selction>
    );
  }
});

export default SettingAlbum;
