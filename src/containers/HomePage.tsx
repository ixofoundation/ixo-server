import * as React from "react";
import {addComponentCSS} from "../utils/css_styler";
import {IPublicSiteStoreState} from "../redux/public_site/public_site_reducer";
import {connect} from 'react-redux';
import {GenerateMnemonicFromStore} from "../components/home/GenerateMnemonic";
import {generateMnemonic} from "../redux/public_site/user/user_action_creators";
import {AsyncGet} from "../lib/redux_utils/async_get";

addComponentCSS({
    //language=CSS
    default: `
    `
});

interface IProperties {
    mnemonic?: AsyncGet<string>
}

interface ICallbacks {
    onFetchMnemonic?: () => void
}

interface IProps extends IProperties, ICallbacks {
}


export class HomePage extends React.Component<IProps, any> {

    render() {
        return <div>
            <GenerateMnemonicFromStore/>
        </div>;
    }
}


/*=================================================================*/
/**************************Redux Mappers**************************/

/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
        mnemonic: state.userStore.mnemonic
    }
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onFetchMnemonic: () => {
            dispatch(generateMnemonic());
        }
    }
}

export const HomePageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(HomePage);
