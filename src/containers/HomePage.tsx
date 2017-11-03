import * as React from "react";
import {addComponentCSS} from "../utils/css_styler";
import {IPublicSiteStoreState} from "../redux/public_site/public_site_reducer";
import {connect} from 'react-redux';
import {GenerateMnemonicFromStore} from "../components/home/GenerateMnemonic";
import {GenerateSDIDFromStore} from "../components/home/GenerateSDID";
import {renderIf} from "../utils/react_utils";

addComponentCSS({
    //language=CSS
    default: `
        .tge-home-page {
            text-align: left;
            margin: 10px 0px 10px 0px;
        }

        .tge-home-page__button {
            margin: 5px 5px 5px 10px;
            font-size: 16px;
            padding: 5px 5px;
        }
    `
});

interface IProperties {
}

interface ICallbacks {
}

interface IProps extends IProperties, ICallbacks {
}

interface IState {
}


export class HomePage extends React.Component<IProps, IState> {


    render() {
        return <div className="tge-home-page">
            <GenerateMnemonicFromStore/>
        </div>;
    }
}


/*=================================================================*/
/**************************Redux Mappers**************************/

/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {}
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {}
}

export const HomePageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(HomePage);
