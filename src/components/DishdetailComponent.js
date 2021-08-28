import { baseUrl } from '../shared/baseUrl';

import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody,
 Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false

    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {

    this.toggleModal();
    // console.log('Current State is: ' + JSON.stringify(values));
    // alert('Current State is: ' + JSON.stringify(values));

    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);



}

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }


  render() {
    return( 
      <div>   
        <Button outline onClick={this.toggleModal} > Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                      
                      <Row className="form-group">
                        <Col>
                          <Label htmlFor="rating" md={2}>Rating </Label>

                            <Control.select model=".rating" name="Rating"
                                className="form-control">
                                <option>5</option>
                                <option>4</option>
                                <option>3</option>
                                <option>2</option>
                                <option>1</option>
                            </Control.select>
                                                    
                        </Col>
      
                      </Row>


                      <Row className="form-group">
                        <Col>
                        <Label htmlFor="author" md={4}>Your Name</Label>
                              
                              <Control.text model=".author" id="author" name="author"
                                  placeholder="First Name"
                                  className="form-control"
                                  validators={{
                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                                  />
                              <Errors
                                  className="text-danger"
                                  model=".author"
                                  show="touched"
                                  messages={{
                                      required: 'Required',
                                      minLength: 'Must be greater than 2 characters',
                                      maxLength: 'Must be 15 characters or less'
                                  }}
                              />
                          
                        </Col>
 
                          </Row>
                          <Row className="form-group">
                                <Col>
                                <Label htmlFor="comment" md={2}>Comment</Label>

                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                                
                                </Col>
                            

                            </Row>



                          <Row className="form-group">
                              <Col md={{size:10}}>
                                  <Button type="submit" color="primary">
                                  Submit
                                  </Button>
                              </Col>
                          </Row>
                      </LocalForm>

                    </ModalBody>
                </Modal>
      </div>
      )

  }


}
function RenderDish({dish}) {
        if (dish != null)
          return(
            <Card>
              <CardImg top src={baseUrl + dish.image} alt={dish.name} />
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
    function RenderComments({comments, addComment, dishId}) {

      return(
        <div>
          <div> <h4> Comments </h4> </div>
          {
            comments.map((eachComment)=>
            (
              <div>
                {eachComment.comment} 
                <p>
                  --{eachComment.author}
                  &nbsp;
                  {new Intl.DateTimeFormat('en-US',
                   { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(eachComment.date)))} 
                </p>
              </div>
            )
            
           )
          
          }
          <CommentForm dishId={dishId} addComment={addComment} />
        </div>
      )
    }

    const DishDetail = (props) => {
      if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 

        return (
          <div className="container">
            <div className="row">
                <Breadcrumb>

                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments}
                  addComment={props.addComment}
                  dishId={props.dish.id}
                />
                    
                </div>
            </div>
          </div>
      );

    }



export default DishDetail ;