export class BusinessCode {
    public business_code: string
    public desc_bm: string
    public desc_en: string
    public std_ref: string

    constructor(
        business_code: string,
        desc_bm: string,
        desc_en: string,
        std_ref: string
    ) {
        this.business_code = business_code
        this.desc_bm = desc_bm
        this.desc_en = desc_en
        this.std_ref = std_ref
    }
}