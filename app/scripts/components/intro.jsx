import React from 'react'
import bs from 'react-bootstrap'
import intro from '../../../data/intro.json'

var Button = bs.Button;
var Carousel = bs.Carousel;
var CarouselItem = bs.CarouselItem;
var Col = bs.Col;
var Grid = bs.Grid;
var Jumbotron = bs.Jumbotron;
var Row = bs.Row;

let Intro = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1>{intro.motto}</h1>

            <p>{intro.message}</p>
          </div>
        </Jumbotron>
      </div>
    );
  }
});

export default Intro;
