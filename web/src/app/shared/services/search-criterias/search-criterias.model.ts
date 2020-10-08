export class SearchCriteria {
    public id: string
    public incorp_date_from: string
    public incorp_date_to: string
    public company_status: string
    public company_type: string
    public company_origin: string
    public company_location: string
    public division: string
    public business_code: string

    constructor(
        id: string,
        incorp_date_from: string,
        incorp_date_to: string,
        company_status: string,
        company_type: string,
        company_origin: string,
        company_location: string,
        division: string,
        business_code: string
    ) {
        this.id = id
        this.incorp_date_from = incorp_date_from
        this.incorp_date_to = incorp_date_to
        this.company_status = company_status
        this.company_type = company_type
        this.company_origin = company_origin
        this.company_location = company_location
        this.division = division
        this.business_code = business_code
    }
}