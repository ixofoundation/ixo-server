import * as React from 'react';
import {addComponentCSS} from '../../utils/css_styler';
import {AsyncGet} from "../../lib/redux_utils/async_get";
import {IPublicSiteStoreState} from "../../redux/public_site/public_site_reducer";
import {generateMnemonic} from "../../redux/public_site/user/user_action_creators";
import {connect} from 'react-redux';
import {SplitButton, DropdownButton, MenuItem} from 'react-bootstrap';
import {renderIfTrue} from "../../utils/react_utils";
import {GenerateSDIDFromStore} from "./GenerateSDID";
import {imageWithVersion} from "../../utils/version";

declare const Clipboard;

addComponentCSS({
    //language=CSS
    default: `
        .tge-generate-mnemonic {
            margin: 0px 10px 0px 10px;
        }

        .tge-generate-mnemonic_wrapper {
            margin-left: 20px;
        }

        .tge-generate-mnemonic__img {
            margin-top: -3px;
            position: relative;
            top: 3px;
            width: 15px;
        }

        .tge-generate-mnemonic__logo {
            position: relative;
            width: 300px;
        }

        .tge-generate-mnemonic__btn {
            position: absolute;
            right: 15px;
            margin-top: 15px;
        }

        .tge-generate-mnemonic__text-area {
            padding: 10px 0px 10px 0px;
            width: auto;
            border-radius: 2px;
            margin-top: 10px;
            background-color: black;
            color: lawngreen;
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
            finalMnemonic: "",
            copied       : false
        };
        this.renderCopyToClipboardSection = this.renderCopyToClipboardSection.bind(this);
    }

    componentDidMount() {
        this.props.onGenerateMnemonic();
        var clipboard = new Clipboard('.btn');

        clipboard.on('success', function (e) {
            showTooltip(e.trigger, 'Copied!');
            e.clearSelection();
        });

        clipboard.on('error', function (e) {
            console.error('Action:', e.action);
            console.error('Trigger:', e.trigger);
        });

        function showTooltip(elem, msg) {
            elem.setAttribute('class', 'btn tooltipped tooltipped-s');
            elem.setAttribute('aria-label', msg);
        }
    }


    componentDidUpdate(prevProps: IProps) {
        if (prevProps.mnemonic.value != null && prevProps.mnemonic.value != this.props.mnemonic.value) {
            this.setState({finalMnemonic: prevProps.mnemonic.value["mnemonic"]});
        }
    }

    private renderCopyToClipboardSection(): JSX.Element {
        var buttonImage = '/images/' + imageWithVersion('clippy.svg');
        return (
            <div className="input-group">
                <input id="mnemonic" type="text"
                       value={this.state.finalMnemonic}/>
                <span className="input-group-button">
                    <button className="btn" data-clipboard-target="#mnemonic" aria-label="Copied">
                        <img className="tge-generate-mnemonic__img" src={buttonImage}/>
                    </button>
                </span>
            </div>
        )

    }

    public render(): JSX.Element {
        var logo = '/images/' + imageWithVersion('ixo-logo.png');

        return (
            <div className="tge-generate-mnemonic">
                <img className="tge-generate-mnemonic__logo" src={logo}/>
                <div className="tge-generate-mnemonic_wrapper">
                    <h2>
                        Please remember this mnemonic:
                    </h2>
                    {this.renderCopyToClipboardSection()}
                    <div className="tge-generate-mnemonic__btn">
                        <button className="btn" onClick={this.props.onGenerateMnemonic}>
                            Generate
                        </button>
                    </div>


                    {
                        renderIfTrue(this.state.finalMnemonic !== null, () =>
                            <div className="tge-generate-mnemonic__text-area">
                                <GenerateSDIDFromStore mnemonic={this.state.finalMnemonic}/>
                            </div>
                        )
                    }
                </div>
            </div>
        )
            ;
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