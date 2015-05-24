import React from 'react'
import marked from 'marked'
import bs from 'react-bootstrap'

var { Panel } = bs;

let Memo = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/memo.json'))
  },

  render: function () {
    var memo = marked(this.state.memo, {sanitize: true});
    return (
      <div className="container">
        <Panel>
          <div dangerouslySetInnerHTML={{__html:  memo}}></div>
        </Panel>
      </div>
    );
  }
});

export default Memo;
