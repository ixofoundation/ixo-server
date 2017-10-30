import * as crypto from 'crypto';
import * as sovrinDID from 'sovrin-did';
/**
 * Returns a sovrin DID based off a mnemonic
 * see bip39.generateMnemonic(); to generate the mnemonic
 * @param mnemonic
 */
export function fromMnemonic(mnemonic){
  // Create sha256 hash from Menmonic
  const seed = crypto.createHash('sha256').update(mnemonic).digest("hex")

  // Convert SHA256 hash to Uint8Array
  var didSeed = new Uint8Array(32);
  for(var i=0; i < 32; ++i){
    didSeed[i] = parseInt(seed.substring(i*2, i*2+2), 16)
  }

  // Create the Sovrin DID
  return sovrinDID.fromSeed(didSeed);
}

