export class Entity {
    public id: string
    public name: string
    public local_or_foreign: string
    public type_of_entity: string
    public check_digit: string
    public registration_number: string
    public registration_number_new: string
    public company_number: string
    public company_number_new: string
    public audit_firm_number: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        local_or_foreign: string,
        type_of_entity: string,
        check_digit: string,
        registration_number: string,
        registration_number_new: string,
        company_number: string,
        company_number_new: string,
        audit_firm_number: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.local_or_foreign = local_or_foreign
        this.type_of_entity = type_of_entity
        this.check_digit = check_digit
        this.registration_number = registration_number
        this.registration_number_new = registration_number_new
        this.company_number = company_number
        this.company_number_new = company_number_new
        this.audit_firm_number = audit_firm_number
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

