import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {AsyncGet} from "../../lib/redux_utils/async_get";
import {IPublicSiteStoreState} from "../../redux/public_site/public_site_reducer";
import {generateMnemonic} from "../../redux/public_site/user/user_action_creators";
import {connect} from 'react-redux';

addComponentCSS({
    //language=CSS
    default: `
        .tge-user-contact-details-form {
            min-width: 320px;
            color: #2f2564;
            background-image: linear-gradient(to bottom, #ffffff, #f1f0fe);
        }

        .tge-user-contact-details-form__next-btn-wrapper {
            margin: 20px 0;
            text-align: center;
        }
    `
});

interface IProperties {
    mnemonic?: AsyncGet<string>
}

interface ICallbacks {
    onLoad?: () => void
}

interface IProps extends IProperties, ICallbacks {
}

interface IState {
    finalMnemonic?: string
}

export class GenerateMnemonic extends React.Component<IProps, IState> {

    public constructor(props: IProps, context?: any) {
        super(props, context);
        this.state = {
            finalMnemonic: null
        };
    }

    public componentDidMount() {
        this.props.onLoad();
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.mnemonic.value != this.props.mnemonic.value && this.state.finalMnemonic === null) {
            this.setState({finalMnemonic: this.props.mnemonic.value["mnemonic"]});
        }
    }

    public render(): JSX.Element {

        return (
            <div className="tge-user-contact-details-form">
                <h3 className="tge-user-contact-details-form__title">
                    Please remember this mnemonic:
                </h3>
                <h4>
                    {this.state.finalMnemonic}
                </h4>
            </div>
        );
    }
}


/*=================================================================*/
/***************************Redux Mappers***************************/

/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
        mnemonic: state.userStore.mnemonic
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onLoad: () => {
            dispatch(generateMnemonic());
        }
    };
}

export const GenerateMnemonicFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(GenerateMnemonic);