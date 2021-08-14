import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';

function RenderCard({item}) {
//item.designation is only for leaders so ? means if item.designation is not null we will render the
// code after it and if it's null we will render null
  return(
      <Card>
          <CardImg src={item.image} alt={item.name} />
          <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null } 
          <CardText>{item.description}</CardText>
          </CardBody>
      </Card>
  );

}


function Home(props) {
  return(
      <div className="container">
          <div className="row align-items-start">
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.dish} />
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.promotion} />
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.leader} />
              </div>
          </div>
      </div>
  );
}

export default Home;   