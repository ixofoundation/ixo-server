import {getMnemonicHandler, getSDIDHandler} from "./handlers/mnemonic";

module.exports = (app) => {
    // Devices routes
    app.get('/api/user', /** route handler **/);

    app.get('/api/mnemonic', getMnemonicHandler);
    app.get('/api/sdid/:mnemonic', getSDIDHandler);
};
