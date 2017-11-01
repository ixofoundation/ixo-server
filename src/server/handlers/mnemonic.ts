/** Return mnemonic */
import {generateBip39Mnemonic} from "../utils/crypto";

export function getMnemonicHandler(req: any, res: any) {
    var mnemonic = generateBip39Mnemonic();
    res.status(200).send({mnemonic: mnemonic});
}