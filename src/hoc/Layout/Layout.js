import React, {Component} from "react";
import cssClasses from "./Layout.module.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';


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
                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler} showSideDrawer={this.state.showSideDrawer} />
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div className={cssClasses.Content}>{this.props.children}</div>
            </React.Fragment>
        )
    }
}


export default Layout;

