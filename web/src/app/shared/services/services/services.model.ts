export class Request {
    public id: string
    public service_type: string
    public name: string
    public organisation: string
    public address: string
    // public address_2: string
    // public address_3: string
    // public postcode: string
    // public city: string
    // public state: string
    // public country: string
    public email: string
    public phone_number: string
    public remarks: string
    public completed: boolean
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        service_type: string,
        name: string,
        organisation: string,
        address: string,
        // address_2: string,
        // address_3: string,
        // postcode: string,
        // city: string,
        // state: string,
        // country: string,
        email: string,
        phone_number: string,
        remarks: string,
        completed: boolean,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.service_type = service_type
        this.name = name
        this.organisation = organisation
        this.address = address
        // this.address_2 = address_2
        // this.address_3 = address_3
        // this.postcode = postcode
        // this.city = city
        // this.state = state
        // this.country = country
        this.email = email
        this.phone_number = phone_number
        this.remarks = remarks
        this.completed = completed
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class Service {
    public id: string
    public service_type: string
    public name: string
    public organisation: string
    public address: string
    // public address_2: string
    // public address_3: string
    // public postcode: string
    // public city: string
    // public state: string
    // public country: string
    public email: string
    public phone_number: string
    public remarks: string
    public completed: boolean
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        service_type: string,
        name: string,
        organisation: string,
        address: string,
        // address_2: string,
        // address_3: string,
        // postcode: string,
        // city: string,
        // state: string,
        // country: string,
        email: string,
        phone_number: string,
        remarks: string,
        completed: boolean,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.service_type = service_type
        this.name = name
        this.organisation = organisation
        this.address = address
        // this.address_2 = address_2
        // this.address_3 = address_3
        // this.postcode = postcode
        // this.city = city
        // this.state = state
        // this.country = country
        this.email = email
        this.phone_number = phone_number
        this.remarks = remarks
        this.completed = completed
        this.created_date = created_date
        this.modified_date = modified_date
    }
}