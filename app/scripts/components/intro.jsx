import React from 'react'
import bs from 'react-bootstrap'

var { Jumbotron } = bs;

let Intro = React.createClass({

  getInitialState: function () {
    return JSON.parse(ipc.sendSync('read-file', 'data/intro.json'))
  },

  render: function () {
    var html = this.state.message.replace(/\n/g, "<br/>");
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1>{this.state.motto}</h1>

            <div dangerouslySetInnerHTML={{__html:  html}}>
            </div>
          </div>
        </Jumbotron>
      </div>
    );
  }
});

export default Intro;
