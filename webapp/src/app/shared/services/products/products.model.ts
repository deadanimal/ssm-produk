export class Product {
    public id: string
    public name: string
    public description: string
    public slug: string
    public active: boolean
    public ctc: boolean
    public fee: number
    public tax: number
    public tax_start_date: string
    public tax_end_date: string
    public discount: number
    public discount_start_date: string
    public discount_end_date: string
    public coa_code: string
    public coa_description: string
    public webservice: string
    public channel: string
    public output_type: string
    public language: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        description: string,
        slug: string,
        active: boolean,
        ctc: boolean,
        fee: number,
        tax: number,
        tax_start_date: string,
        tax_end_date: string,
        discount: number,
        discount_start_date: string,
        discount_end_date: string,
        coa_code: string,
        coa_description: string,
        webservice: string,
        channel: string,
        output_type: string,
        language: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.slug = slug
        this.active = active
        this.ctc = ctc
        this.fee = fee
        this.tax = tax
        this.tax_start_date = tax_start_date
        this.tax_end_date = tax_end_date
        this.discount = discount
        this.discount_start_date = discount_start_date
        this.discount_end_date = discount_end_date
        this.coa_code = coa_code
        this.coa_description = coa_description
        this.webservice = webservice
        this.channel = channel
        this.output_type = output_type
        this.language = language
        this.created_date = created_date
        this.modified_date = modified_date
    }
}