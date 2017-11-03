/** Return mnemonic */
import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../utils/cryptoUtil";

export function getMnemonicHandler(req: any, res: any) {
    var mnemonic = generateBip39Mnemonic();
    res.status(200).send({mnemonic});
}


export function getSDIDHandler(req: any, res: any) {
    const mnemonic: string = req.params.mnemonic;
    var sdid = generateSdidFromMnemonic(mnemonic);
    res.status(200).send({sdid});
}