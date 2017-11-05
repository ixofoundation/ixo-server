import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {AsyncGet} from "../../lib/redux_utils/async_get";
import {IPublicSiteStoreState} from "../../redux/public_site/public_site_reducer";
import {generateSDID} from "../../redux/public_site/user/user_action_creators";
import {connect} from 'react-redux';
import {ISovrinDidModel} from "../../server/db/models";

var JSONPretty = require('react-json-pretty');

addComponentCSS({
    //language=CSS
    default: `
        .tge-generate-mnemonic {
            margin: 0px 10px 0px 10px;
        }

        .tge-generate-mnemonic__button {
            font-size: 16px;
            padding: 5px 5px;
        }
    `
});

interface IProperties {
    mnemonic: string
    sdid?: AsyncGet<ISovrinDidModel>
}

interface ICallbacks {
    onGenerateSDID?: () => void
}

interface IProps extends IProperties, ICallbacks {
}

interface IState {
    finalSDID?: ISovrinDidModel
}

export class GenerateSDID extends React.Component<IProps, IState> {

    public constructor(props: IProps, context?: any) {
        super(props, context);
        this.state = {
            finalSDID: null
        };
    }

    public componentDidMount() {
        this.props.onGenerateSDID();
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.sdid.value != this.props.sdid.value) {
            this.setState({finalSDID: this.props.sdid.value});
        }
        if (prevProps.mnemonic != this.props.mnemonic) {
            this.props.onGenerateSDID();
        }
    }

    public render(): JSX.Element {

        return (
            <div className="tge-generate-mnemonic">
                <JSONPretty id="json-pretty" json={this.state.finalSDID}></JSONPretty>
            </div>
        );
    }
}


/*=================================================================*/
/***************************Redux Mappers***************************/

/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
        sdid    : state.userStore.sdid,
        mnemonic: ownProps.mnemonic
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onGenerateSDID: () => {
            dispatch(generateSDID(ownProps.mnemonic));
        }
    };
}

export const GenerateSDIDFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(GenerateSDID);