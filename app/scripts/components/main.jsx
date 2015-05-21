import React from 'react'
import bs from 'react-bootstrap'

var { Button, Carousel, CarouselItem, Col, Grid, Row, Jumbotron } = bs;

let Main = React.createClass({

  getInitialState: function () {
    var json = ipc.sendSync('read-file', 'data/slides.json');
    return JSON.parse(json)
  },

  render: function () {
    var items = [];
    for (var i = 0; i < this.state.slides.length; i++) {
      var item =
        <CarouselItem>
          <div className="text-center carousel-img">
            <img width='100%' src={this.state.slides[i].image}/>
          </div>
          <div className='carousel-caption'>
            <h3>{this.state.slides[i].title}</h3>

            <p>{this.state.slides[i].desc}</p>
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
      </div>
    );
  }
});

export default Main;
