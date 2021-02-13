import React, {Component} from "react";
import cssClasses from "./Layout.module.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';


class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false})
    };

    toggleSideDrawerHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
};

    render() {
        return (
            <React.Fragment>
                <Toolbar isAuth={this.props.isAuthenticated} toggleSideDrawer={this.toggleSideDrawerHandler} showSideDrawer={this.state.showSideDrawer} />
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div className={cssClasses.Content}>{this.props.children}</div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token,
    }
};


export default connect(mapStateToProps, null)(Layout);

