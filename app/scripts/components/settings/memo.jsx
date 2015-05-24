import React from 'react'
import bs from 'react-bootstrap'
import marked from 'marked'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingIntro = React.createClass({

  getInitialState: function () {
    var data = JSON.parse(ipc.sendSync('read-file', 'data/memo.json'));
    data.memoPreview = marked(data.memo, {sanitize: true});
    return data;
  },

  saved: function (success) {
  },

  save: function () {
    ipc.on('response-save-file', this.saved);
    this.state.memoPreview = null;
    ipc.send('request-save-file', 'data/memo.json', this.state);
  },

  handleChanged: function () {
    var memo = this.refs.memo.getValue();

    this.setState({
      memo: memo,
      memoPreview: marked(memo, {sanitize: true})
    });
  },

  render: function () {
    return (
      <selction>
        <PageHeader>메모 설정
          <small>: 그밖의 메모를 작성합니다.</small>
        </PageHeader>

        <form className='form-horizontal'>
          <Row>
            <Col sm={6}>
              <Input type='textarea' label='메모' ref='memo'
                     labelClassName='col-sm-2' wrapperClassName='col-sm-10'
                     rows='20'
                     value={this.state.memo}
                     onChange={this.handleChanged}/>
            </Col>
            <Col sm={6}>
              <div dangerouslySetInnerHTML={{__html:  this.state.memoPreview}}></div>
            </Col>
          </Row>

          <div className='text-right'>
            <Button bsStyle='primary' onClick={this.save}>저장</Button>
          </div>
        </form>
      </selction>
    );
  }
});

export default SettingIntro;
