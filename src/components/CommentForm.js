import React ,{Component} from 'react';
import {Button,Modal,ModalHeader,ModalBody, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isFormOpen:false
        }

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal(){
        this.setState({
            isFormOpen: !this.state.isFormOpen
        });
    };

    handleSubmit(values) {
        this.props.addComment(this.props.dishID,values.rating, values.name, values.comment);
        console.log('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className= "fa fa-pencil fa-lg"></span> Submit Comment</Button>
            
                <Modal isOpen={this.state.isFormOpen} toggle={this.toggleModal}>
                    <ModalHeader >
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}><strong>Rating</strong></Label>
                                <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="name" md={12}><strong>Your Name</strong></Label>
                                <Col md={12}>
                                <Control.text model=".name" id="name" name="name" 
                                className="form-control" 
                                placeholder="Enter Your Name"
                                validators = {{
                                    required,minLength:minLength(3),maxLength:maxLength(15)
                                }}
                                >
                                </Control.text>
                                <Errors
                                className="text-danger"
                                model = ".name"
                                show ="touched"
                                messages={{
                                    required:"Required",
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                ></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}><strong>Comment</strong></Label>
                                <Col md={12}>
                                <Control.textarea rows="6" model=".comment" id="comment" 
                                name="comment" 
                                className="form-control" 
                                placeholder="Comments"
                                
                                >
                                </Control.textarea>
                                
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={2}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}


export default CommentForm;