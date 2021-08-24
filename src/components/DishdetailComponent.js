
import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import {  Collapse, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
  
  class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
      isModalOpen: false

    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);


  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleLogin(event) {
    this.toggleModal();
    alert("Username: " + this.username.value + " Password: " + this.password.value
        + " Remember: " + this.remember.checked);
    event.preventDefault();

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
                    <Form onSubmit={this.handleSubmit}>

                      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                      
                      <Row className="form-group">
                        <Col>
                          <Label htmlFor="firstname" md={2}>Rating </Label>

                            <Control.select model=".contactType" name="contactType"
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
                        <Label htmlFor="firstname" md={4}>Your Name</Label>
                              
                              <Control.text model=".firstname" id="firstname" name="firstname"
                                  placeholder="First Name"
                                  className="form-control"
                                  validators={{
                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                                  />
                              <Errors
                                  className="text-danger"
                                  model=".firstname"
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
                                <Label htmlFor="message" md={2}>Comment</Label>

                                <Control.textarea model=".message" id="message" name="message"
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

                      </Form>
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
    function RenderComments({comments}){
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
          <CommentForm />
        </div>
      )
    }

    const DishDetail = (props) => {

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
                    <RenderComments comments={props.comments} />
                    
                </div>
            </div>
          </div>
      );

    }



export default DishDetail ;