export class Product {
    public id: string
    public name: string
    public description: string
    public fee: number
    public language: string
    public output_type: string
    public ctc: boolean
    public slug: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        description: string,
        fee: number,
        language: string,
        output_type: string,
        ctc: boolean,
        slug: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.fee = fee
        this.language = language
        this.output_type = output_type
        this.ctc = ctc
        this.slug = slug
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class Availability {
    public info_charges: boolean
    public financial_year: {
        year2: boolean,
        year3: boolean,
        year5: boolean,
        year10: boolean,
        years: []
    }
    public acgs: boolean
    public shareholders: boolean
    public share_capital: boolean
    public list_address_changes_year: boolean
    public info_incorp_reg: boolean
    public is_name_changed: boolean
    public info_incorp: {
        company_status: string,
        company_type: string,
        local_or_foreign: string
    }
    public info_termination_list: boolean
    public info_branch_list: boolean 
}