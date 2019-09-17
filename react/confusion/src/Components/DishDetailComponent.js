import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Row, Col,
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish(dish) {
    if (dish.dish != null)
        return(
            <Card>
                <CardImg width="100%" src={dish.dish.image} alt={dish.dish.name} />
                <CardBody>
                    <CardTitle>{dish.dish.name}</CardTitle>
                    <CardText>{dish.dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
    );
}
function RenderComments(comments) {
    const coments = comments.comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author},
                &nbsp;
                {new Intl.DateTimeFormat('en-Us',{
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }).format(new Date(comment.date))}
                </p>
            </li>
        )
    })
    return (
            <ul className='list-unstyled'>
                {coments}
            </ul>
            
    )
}

class CommentForm extends Component{
    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
          isModalOpen: false
        };
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }

      handleSubmit(values){
        alert('Current State is: ' + JSON.stringify(values));
      }

    render(){
        if (this.props.dish==null){
                return(
                    <div></div>
                )
        }
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
    
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className='col-12 col-md-5 m-1'>
                    <h4> Comments </h4>
                    <RenderComments comments={this.props.comments} />
                    <Button onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col>
                                    <Label htmlFor="Rating">Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="Your Name" md={5}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".yourname"
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
                                    <Label htmlFor="message" md={6}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="12"
                                            className="form-control" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" color="primary">
                                        Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    </div>
                </div>
                </div>
            );
        }
    }
    export default CommentForm;
