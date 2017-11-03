import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {AsyncGet} from "../../lib/redux_utils/async_get";
import {IPublicSiteStoreState} from "../../redux/public_site/public_site_reducer";
import {generateMnemonic} from "../../redux/public_site/user/user_action_creators";
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {SplitButton, DropdownButton, MenuItem} from 'react-bootstrap';
import {renderIfTrue} from "../../utils/react_utils";
import {GenerateSDIDFromStore} from "./GenerateSDID";

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

        .tge-generate-mnemonic__button-copy {
            border: none;
            margin-left: -5px;
            background: transparent;
        }

        .tge-generate-mnemonic__split-button {
            border-radius: 4px;
        }
    `
});

interface IProperties {
    mnemonic?: AsyncGet<string>
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

        }
    }

    public render(): JSX.Element {

        return (
            <div className="tge-generate-mnemonic">
                <h3>
                    Please remember this mnemonic:
                </h3>
                <SplitButton title={this.state.finalMnemonic} pullRight id="split-button-pull-right"
                             className="tge-generate-mnemonic__split-button">
                    <MenuItem eventKey="1" onClick={this.props.onGenerateMnemonic}>Generate</MenuItem>
                    <MenuItem eventKey="2"><CopyToClipboard text={this.state.finalMnemonic}
                                                            onCopy={() => this.setState({copied: true})}>
                        <button className="tge-generate-mnemonic__button-copy">
                            Copy
                        </button>
                    </CopyToClipboard></MenuItem>
                </SplitButton>
                {
                    renderIfTrue(this.state.finalMnemonic !== null, () =>
                        <div>
                            <GenerateSDIDFromStore mnemonic={this.state.finalMnemonic}/>
                        </div>
                    )}

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