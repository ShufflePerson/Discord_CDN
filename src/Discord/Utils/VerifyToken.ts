import ETokenIssue from "../Types/ETokenIssue";
import GetUTF8Base64 from "./GetUTF8Base64";

function staticVerifyToken(token: string): ETokenIssue {
    //Dot amount check
    let tokenSplitByDots = token.split(".");
    if (tokenSplitByDots.length != 3) return ETokenIssue.INVALID_AMOUNT_OF_DOTS;

    //Ensure the first part is a valid Base64 and UTF-8
    const decodedID = GetUTF8Base64(tokenSplitByDots[0]);
    if (!decodedID) return ETokenIssue.NON_BASE64_UTF8;


    //Ensure the ID is a number
    if (isNaN( Number(decodedID) )) return ETokenIssue.ID_NOT_A_NUMBER;
    
    //Ensure the ID is 17 numbers or more
    if (decodedID.length < 17) return ETokenIssue.ID_TOO_SHORT;

    return ETokenIssue.NONE;
}


/**
 * Returns a Promise<boolean> whether the given token is valid or not. 
 * TODO: Implemend a non static check
 * @param token Discord Token
 * @param performStatic If set, token will be checked statically without any requests to Discord. 
 */
async function VerifyToken(token: string, performStatic: boolean = true): Promise<boolean> {
    let isValidToken: boolean = true;

    if (performStatic) {
        const tokenIssue = staticVerifyToken(token);
        isValidToken = tokenIssue == ETokenIssue.NONE;
        if (!isValidToken) {
            console.log(`[ERROR] VerifyToken(): ${tokenIssue}`)
        }
    } else {
        throw new Error("Non Static check is not yet implemented.");
    }

    return isValidToken;
}

export default VerifyToken;