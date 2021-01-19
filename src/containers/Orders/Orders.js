import React, { Component } from "react";
import Order from './Order/Order';
import axios from "../../axios-orders";
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';


class Orders extends Component{
    state ={
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('orders.json').then(res => {
            const fetchedOrders = Object.entries(res.data).map(([id, elem]) =>  {
                return {id, ...elem}
            });
            this.setState({orders: fetchedOrders, loading: false});
        }).catch(err=> {
            this.setState({loading: false});
        })
    }

    render() {
        console.log(this.state.orders);
     return (
         <div>
             {
             this.state.orders.map(order => {
                 return (
                     <Order key={order.id} ingredients ={order.ingredients} price ={order.price}/>
                 )
             })
         }

         </div>
     );
}
}

export default WithErrorHandler(Orders, axios);
