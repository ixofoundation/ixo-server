export function generateBip39Mnemonic(): Promise<any> {
    var bip39 = require('bip39');
    return bip39.generateMnemonic();
}