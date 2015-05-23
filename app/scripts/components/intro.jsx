import React from 'react'
import marked from 'marked'
import bs from 'react-bootstrap'

var { Jumbotron } = bs;

let Intro = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/intro.json'))
  },

  render: function () {
    var msg = marked(this.state.msg, {sanitize: true});
    var etc = marked(this.state.etc, {sanitize: true});
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1>{this.state.motto}</h1>

            <div dangerouslySetInnerHTML={{__html:  msg}}></div>
          </div>
        </Jumbotron>

        <div className="container">
          <div dangerouslySetInnerHTML={{__html:  etc}}></div>
        </div>
      </div>
    );
  }
});

export default Intro;
