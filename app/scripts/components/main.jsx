import React from 'react'
import bs from 'react-bootstrap'
import slides from '../../../data/slides.json'

var { Button, Carousel, CarouselItem, Col, Grid, Row, Jumbotron } = bs;

let Main = React.createClass({

  getInitialState: function () {
    return {}
  },

  render: function () {
    var items = [];
    for (var i = 0; i < slides.length; i++) {
      var item =
        <CarouselItem>
          <div className="text-center carousel-img">
            <img width='100%' src={slides[i].image}/>
          </div>
          <div className='carousel-caption'>
            <h3>{slides[i].title}</h3>

            <p>{slides[i].desc}</p>
          </div>
        </CarouselItem>;
      items.push(item);
    }

    return (
      <div>
        <div className="container">
          <Carousel>
            {items}
          </Carousel>
        </div>

        <hr className="featurette-divider"/>
      </div>
    );
  }
});

export default Main;
