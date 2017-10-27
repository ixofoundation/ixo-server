import * as React from "react";
import {addComponentCSS} from "../utils/css_styler";
import {IPublicSiteStoreState} from "../redux/public_site/public_site_reducer";
import {connect} from 'react-redux';

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProperties {
    name: string;
}

interface ICallbacks {
}

interface IProps extends IProperties, ICallbacks {
}


export class HomePage extends React.Component<IProps, any> {

  render() {
    return <div>Hello, {this.props.name}</div>;
  }
}


/*=================================================================*/
/**************************Redux Mappers**************************/
/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
        name: ownProps.name
    }
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {

    }
}

export const HomePageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(HomePage);
