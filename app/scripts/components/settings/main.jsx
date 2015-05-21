import React from 'react'
import bs from 'react-bootstrap'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingMain = React.createClass({

  getInitialState: function () {
    var json = ipc.sendSync('read-file', 'data/slides.json');
    return JSON.parse(json);
  },

  save: function () {
    var self = this;
    var valid = true;

    var checkValidation = function (value, style) {
      var state = {};
      if (!value || !value.trim()) {
        state[style] = 'error';
        valid = false;
      } else {
        state[style] = null;
      }
      self.setState(state);
    };

    for (var i = 0; i < 3; i++) {
      var titleKey = "title" + (i + 1);
      var descKey = "desc" + (i + 1);
      var title = this.refs[titleKey].getValue();
      var desc = this.refs[descKey].getValue();

      checkValidation(title, titleKey + 'Style');
      checkValidation(desc, descKey + 'Style');
    }

    if (valid) {
      var slides = {
        "slides": this.state.slides
      };
      ipc.on('response-write-file', function (success) {
      });
      ipc.send('request-write-file', 'data/slides.json', slides);
    }
  },

  handleMenuChanged: function () {
    var slides = [];
    for (var i = 0; i < 3; i++) {
      slides.push({
        "title": this.refs["title" + (i + 1)].getValue(),
        "image": this.state.slides[i].image,
        "desc": this.refs["desc" + (i + 1)].getValue()
      });
    }

    this.setState({
      slides: slides
    });
  },

  openImage: function (index) {
    var old = this.state.slides[index].image;
    var image = ipc.sendSync('request-copy-slide', old);

    if (image) {
      var slides = this.state.slides;
      slides[index].image = image;
      this.setState(slides);
    }
  },

  openAlbum: function () {
    ipc.sendSync('open-slides-dir');
  },

  render: function () {
    var base = ipc.sendSync('get-base-dir');
    return (
      <selction>
        <PageHeader>메인 설정
          <small>: 첫 화면을 설정합니다.</small>
        </PageHeader>

        <Grid>
          <Row>
            <Button bsStyle='primary' onClick={this.openAlbum}>폴더 열기</Button> :
            폴더를 열어서 메인 화면에 나올 사진 3장 넣으세요.
          </Row>
        </Grid>

        <br/>

        <div>
          <Row>
            <Col sm={6}>
              <Input type='text' addonBefore='Title #1' ref='title1'
                     value={this.state.slides[0].title}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.title1Style}/>
            </Col>
            <Col sm={6}>
              <Input type='text' addonBefore='Description #1' ref='desc1'
                     value={this.state.slides[0].desc}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.desc1Style}/>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type='text' addonBefore='Title #2' ref='title2'
                     value={this.state.slides[1].title}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.title2Style}/>
            </Col>
            <Col sm={6}>
              <Input type='text' addonBefore='Description #2' ref='desc2'
                     value={this.state.slides[1].desc}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.desc2Style}/>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type='text' addonBefore='Title #3' ref='title3'
                     value={this.state.slides[2].title}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.title3Style}/>
            </Col>
            <Col sm={6}>
              <Input type='text' addonBefore='Description #3' ref='desc3'
                     value={this.state.slides[2].desc}
                     onChange={this.handleMenuChanged}
                     bsStyle={this.state.desc3Style}/>
            </Col>
          </Row>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>

          <br/>
        </div>
      </selction>
    );
  }
});

export default SettingMain;
