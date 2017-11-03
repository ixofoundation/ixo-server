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
            margin: 0px 10px 0px 10px;
        }
        .tge-generate-mnemonic__button {
            margin-top: 5px;
            font-size: 16px;
            padding: 5px 5px;
        }
    `
});

interface IProperties {
    mnemonic?: AsyncGet<string>
    onDone: (mnemonic: string) => void
}

interface ICallbacks {
    onGenerateMnemonic?: () => void
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
        this.props.onGenerateMnemonic();
    }

    componentDidUpdate(prevProps: IProps) {
        if (prevProps.mnemonic.value != this.props.mnemonic.value) {
            this.setState({finalMnemonic: prevProps.mnemonic.value["mnemonic"]});
            this.props.onDone(prevProps.mnemonic.value["mnemonic"]);
        }
    }

    public render(): JSX.Element {

        return (
            <div className="tge-generate-mnemonic">
                <h3>
                    Please remember this mnemonic:
                </h3>

                <div>
                    {this.state.finalMnemonic}
                </div>
                <div>
                    <button
                        className="tge-generate-mnemonic__button btn btn-modern tge-btn-purple btn-round-lg btn-lg"
                        type="button" onClick={this.props.onGenerateMnemonic}>
                        Generate
                    </button>
                </div>
                <div>
                    <CopyToClipboard text={this.state.finalMnemonic}
                                     onCopy={() => this.setState({copied: true})}>
                        <button
                            className="tge-generate-mnemonic__button btn btn-modern tge-btn-purple btn-round-lg btn-lg">
                            Copy
                        </button>
                    </CopyToClipboard>
                </div>

            </div>
        );
    }
}


/*=================================================================*/
/***************************Redux Mappers***************************/

/*=================================================================*/

function mapStateToProps(state: IPublicSiteStoreState, ownProps: IProps): IProperties {
    return {
        mnemonic: state.userStore.mnemonic,
        onDone: ownProps.onDone
    };
}

function mapDispatchToProps(dispatch, ownProps: IProps): ICallbacks {
    return {
        onGenerateMnemonic: () => {
            dispatch(generateMnemonic());
        }
    };
}

export const GenerateMnemonicFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(GenerateMnemonic);