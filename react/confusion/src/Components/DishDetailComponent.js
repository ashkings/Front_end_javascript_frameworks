import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {coments}
                </ul>
            </div>
        )
    }
    const  DishDetail = (props) => {
        if (props.dish==null){
    		return(
    			<div></div>
    		)
    	}
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
                <RenderComments comments={props.comments} />
            </div>
            </div>
        );
    }
export default DishDetail;