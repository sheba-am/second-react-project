
import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

// class DishDetail  extends Component {
//     constructor(props) {
//         super(props);

//     };

    function RenderDish({dish}) {
        if (dish != null)
          return(
            <Card>
              <CardImg top src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle> {dish.name} </CardTitle>
                <CardText> {dish.description} </CardText>
              </CardBody>
            </Card>
          ) ;
        else
            return(
              <div></div>
            )
      }
    function RenderComment({dish}) {
        
        if(dish != null)
          {
            
            return(
            <div>
              <div>
              <h4> Comments</h4>
              </div>
              {
                //dish.comments[0].comment
                // this.props.category
                dish.comments.map((showCM)=> (
                  <div> 
                    {showCM.comment}
                   
                    <p>
                    --{showCM.author}
                    &nbsp;
                      {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(showCM.date)))}
                    </p>
                  </div>

                ))
              }
            </div>
            



          )}else
            return(
                <div></div>
            )
    }
    const DishDetail = (props) => {

        return(
            <div className="container" >
              <div className="row">
                
                <div  className="col-12 col-md-5 m-1">
                <RenderDish dish={props.selectdishes} />
                </div>
                
                

                <div  className="col-12 col-md-5 m-1">
                 
                  <div>
                    <RenderComment dish={props.selectdishes} />
                   </div>
                </div>

              </div>
            </div>
        )
    }



export default DishDetail ;