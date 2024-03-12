interface IConfig {
    TOKEN: string,
    FALLBACK: boolean,
    PORT: number,

    //Optionals
    bypassTokenChecks: boolean
}

export default IConfig;