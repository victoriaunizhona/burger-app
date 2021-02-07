import React, { Component } from "react";
import Order from './Order/Order';
import axios from "../../axios-orders";
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import Spinner from '../../components/ui/Spinner/Spinner';


class Orders extends Component{
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading ){
            orders = (
                <div>
                    {
                        this.props.orders.map(order => {
                            return (
                                <Order key={order.id} ingredients ={order.ingredients} price ={order.price}/>
                            )
                        })
                    }

                </div>
            );
        }
     return orders;
}
}


const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));
