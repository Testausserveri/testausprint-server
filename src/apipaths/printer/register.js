
const failCapabilitiesParsing = {errorCode: 107, message: "Printer features are invalid"};
const notClaimed = {errorCode: 502, message: "Not claimed yet!"};


/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const registerPrinter = async (req, res) => {
    // TODO
    res.json({"success": true});
}

const checkClaimStatus = async (req, res) => {

}

module.exports = {
    registerPrinter
}