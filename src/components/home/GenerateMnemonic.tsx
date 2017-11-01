import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {AsyncGet} from "../../lib/redux_utils/async_get";
import {IPublicSiteStoreState} from "../../redux/public_site/public_site_reducer";
import {generateMnemonic} from "../../redux/public_site/user/user_action_creators";
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

addComponentCSS({
    //language=CSS
    default: `
        .tge-generate-mnemonic {
            min-width: 320px;
            color: #2f2564;
            background-image: linear-gradient(to bottom, #ffffff, #f1f0fe);
        }

        .tge-generate-mnemonic__button {
            font-size: 16px;
            padding: 18px 0;
            width: 170px;
        }
    `
});

interface IProperties {
    mnemonic?: AsyncGet<string>
}

interface ICallbacks {
    noGenerateMnemonic?: () => void
}

interface IProps extends IProperties, ICallbacks {
}

interface IState {
    finalMnemonic?: string
    copied: boolean
}

export class GenerateMnemonic extends React.Component<IProps, IState> {

    public constructor(props: IProps, context?: any) {
        super(props, context);
        this.state = {
            finalMnemonic: null,
            copied       : false
        };
    }

    public componentDidMount() {
        this.props.noGenerateMnemonic();
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.mnemonic.value != this.props.mnemonic.value) {
            this.setState({finalMnemonic: this.props.mnemonic.value["mnemonic"]});
        }
    }

    public render(): JSX.Element {

        return (
            <div className="tge-generate-mnemonic">
                <h3>
                    Please remember this mnemonic:
                </h3>
                <h4>
                    {this.state.finalMnemonic}
                </h4>
                <button
                    className="tge-generate-mnemonic__button btn btn-modern tge-btn-purple btn-round-lg btn-lg"
                    type="button" onClick={this.props.noGenerateMnemonic}>
                    Generate
                </button>

                <CopyToClipboard text={this.state.finalMnemonic}
                                 onCopy={() => this.setState({copied: true})}>
                    <button className="tge-generate-mnemonic__button btn btn-modern tge-btn-purple btn-round-lg btn-lg">
                        Copy
                    </button>
                </CopyToClipboard>
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
        noGenerateMnemonic: () => {
            dispatch(generateMnemonic());
        }
    };
}

export const GenerateMnemonicFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(GenerateMnemonic);