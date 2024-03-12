function hasNonUTF8Characters(str: string): boolean {
  return /[^\x00-\x7F]/.test(str);
}


/**
 * Performs multiple checks on the input string
 * @param input The Base64 String to Check
 * @returns A `boolean` whetever the given string is a valid UTF-8 string when decoded from Base64
 */
function GetUTF8Base64(input: string): string | null {
    try {
        const buf = Buffer.from(input, "base64");
        const decodedBase64 = buf.toString();
        if (hasNonUTF8Characters(decodedBase64))
            throw new Error("Contains Non UTF-8 character(s).")

        return decodedBase64;
    } catch (ex) {
        return null;
    }
}

export default GetUTF8Base64;