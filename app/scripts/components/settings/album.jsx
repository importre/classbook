import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingAlbum = React.createClass({

  openAlbum: function () {
    ipc.sendSync('open-album-dir');
  },

  render: function () {
    return (
      <selction>
        <PageHeader>앨범 설정
          <small>: 앨범 폴더를 열어서 사진을 넣으세요.</small>
        </PageHeader>

        <div className='text-right'>
          <Button bsStyle='primary' onClick={this.openAlbum}>앨범폴더 열기</Button>
        </div>
      </selction>
    );
  }
});

export default SettingAlbum;
