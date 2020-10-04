export class CompanyStatus {
    public code: string
    public desc: string

    constructor(
        code: string,
        desc: string
    ) {
        this.code = code
        this.desc = desc
    }
}