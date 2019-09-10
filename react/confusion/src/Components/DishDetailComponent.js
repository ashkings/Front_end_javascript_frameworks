import React from 'react';
import { Card, CardImg, CardText, CardBody,CardTitle } from 'reactstrap';

	function RenderDish(dish) {
		if (dish != null)
            return(
                 <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
        );
    }
    function RenderComments(comments) {
    	const coments = comments.map((comment) => {
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
    	const dish = props.selectedDish
    	if (dish==null){
    		return(
    			<div></div>
    		)
    	}
    	const dishDetail = RenderDish(dish)
    	const dishComment = RenderComments(dish.comments)
    	return(
    		<div className="container">
    			<div className="row">
    				{dishDetail}
    				{dishComment}
    			</div>
    		</div>
    	)
    }
export default DishDetail;