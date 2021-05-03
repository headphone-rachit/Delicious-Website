import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm'

function RenderDish({ dish }) {

    if (dish != null)
        return (

            <div className="col-12 col-md-5 m-1">
                <Card >
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h3>{dish.name}</h3></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>


        );
}

function CommentViewer({ comments,addComment,dishID }) {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comment</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (
                            <li key="{comment.id}" className="mt-4 mb-1" >
                                <p>{comment.comment}</p>
                                <p>---{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })}
                </ul>
                <CommentForm addComment={addComment} dishId={dishID}></CommentForm>
            </div>
        );
    }
}


const Dish = (props) => {
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
                <RenderDish dish={props.dish} />
                <CommentViewer comments={props.comments} addComment={props.addComment} dishID={props.dish.id}/>
            </div>
        </div>


    );
}

export default Dish