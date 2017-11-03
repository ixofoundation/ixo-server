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
    onGenerateMnemonic?: () => void
}

interface IProps extends IProperties, ICallbacks {
}

interface IState {
    isNextClicked: boolean
    buttonText: string
    mnemonic: string
}


export class HomePage extends React.Component<IProps, IState> {

    public constructor(props: IProps, context?: any) {
        super(props, context);
        this.state = {
            isNextClicked: false,
            buttonText: "Next",
            mnemonic: null
        };
        this.onNextClicked = this.onNextClicked.bind(this);
        this.storeMnemonic =this.storeMnemonic.bind(this);
    }

    private onNextClicked() {
        if(!this.state.isNextClicked){
            this.setState({isNextClicked: true, buttonText: "Back", mnemonic: this.state.mnemonic});
        } else{
            this.setState({isNextClicked: false, buttonText: "Next", mnemonic: this.state.mnemonic});
        }
    }

    private storeMnemonic(mnemonic: string) {
        this.setState({mnemonic: mnemonic});
    }

    render() {
        return <div className="tge-home-page">

            {renderIf(this.state.isNextClicked, {
                ifTrue : () => (
                    <div>
                        <GenerateSDIDFromStore mnemonic={this.state.mnemonic}/>
                    </div>
                ),
                ifFalse: () => (
                    <div>
                        <GenerateMnemonicFromStore onDone={this.storeMnemonic}/>
                    </div>
                )
            })}
            <button
                className="tge-home-page__button btn btn-modern tge-btn-purple btn-round-lg btn-lg"
                onClick={this.onNextClicked}>
                {this.state.buttonText}
            </button>

        </div>;
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

export const HomePageFromStore = connect(
    mapStateToProps, mapDispatchToProps
)(HomePage);
