import React from 'react'
import bs from 'react-bootstrap'
import marked from 'marked'

var { Panel, PageHeader, Input, Button } = bs;
var { Grid, Row, Col } = bs;

let SettingHelp = React.createClass({

  getInitialState: function () {
    var data = JSON.parse(ipc.sendSync('read-file', 'data/help.json'));
    data.helpPreview = marked(data.help, {sanitize: true});
    return data;
  },

  handleChanged: function () {
    var help = this.refs.help.getValue();

    this.setState({
      help: help,
      helpPreview: marked(help, {sanitize: true})
    });
  },

  render: function () {
    return (
      <selction>
        <PageHeader>연습장
          <small>: 연습해 보세요.</small>
        </PageHeader>

        <form className='form-horizontal'>
          <Row>
            <Col sm={6}>
              <Input type='textarea' label='연습장' ref='help'
                     labelClassName='col-sm-2' wrapperClassName='col-sm-10'
                     rows='20'
                     value={this.state.help}
                     onChange={this.handleChanged}/>
            </Col>
            <Col sm={6}>
              <div dangerouslySetInnerHTML={{__html:  this.state.helpPreview}}></div>
            </Col>
          </Row>
        </form>
      </selction>
    );
  }
});

export default SettingHelp;
