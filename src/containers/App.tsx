import * as React from 'react';
import {HomePage} from "./HomePage";
import {IPublicSiteStoreState} from "../redux/public_site/public_site_reducer";
import {connect} from 'react-redux';

interface IProperties {
}

interface ICallbacks {
}


interface IProps extends IProperties, ICallbacks {
}

export class App extends React.Component<IProps, any> {

    public render() {
        return (
            <div>
               <HomePage name='BOB'/>
            </div>
        );
    }
}



/*=================================================================*/
/**************************Redux Mappers**************************/
/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
    }
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {

    }
}

export var AppFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(App);