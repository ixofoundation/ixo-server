import {getMnemonicHandler} from "./handlers/mnemonic";

module.exports = (app) => {
    // Devices routes
    app.get('/api/user', /** route handler **/);

    app.get('/api/mnemonic', getMnemonicHandler);
};
