export class Request {
    public id: string
    public reference_id: string
    public receipt_number: string
    public service_type: string
    public name: string
    public organisation: string
    public address: string
    public email: string
    public phone_number: string
    public pending: boolean
    public in_progress: boolean
    public completed: boolean
    public in_progress_date: string
    public completed_date: string
    public remarks: string
    public pic: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        service_type: string,
        name: string,
        organisation: string,
        address: string,
        email: string,
        phone_number: string,
        pending: boolean,
        in_progress: boolean,
        completed: boolean,
        in_progress_date: string,
        completed_date: string,
        remarks: string,
        pic: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.service_type = service_type
        this.name = name
        this.organisation = organisation
        this.address = address
        this.email = email
        this.phone_number = phone_number
        this.remarks = remarks
        this.pending = pending
        this.in_progress = in_progress
        this.in_progress_date = in_progress_date
        this.completed = completed
        this.completed_date = completed_date
        this.pic = pic
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class Service {
    public id: string
    public name: string
    public service_type: string
    public entities_type: string
    public product_type: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        service_type: string,
        entities_type: string,
        product_type: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name,
        this.service_type = service_type,
        this.entities_type = entities_type,
        this.product_type = product_type,
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class EGovernmentRequest {
    public id: string
    public egov_request: string 

    public egov_package: string 
    public egov_quota: string 
    
    public position_or_grade: string 

    public head_of_department_name: string 
    public head_of_department_position: string 
    public head_of_department_email: string 

    public ministry_name: string 
    public division_name: string 
    public agency_name: string 
    public department_name: string 

    public created_date: string 
    public modified_date: string 

    constructor(
        id: string,
        egov_request: string,
        egov_package: string,
        egov_quota: string,
        position_or_grade: string,
        head_of_department_name: string,
        head_of_department_position: string,
        head_of_department_email: string,
        ministry_name: string,
        division_name: string,
        agency_name: string,
        department_name:string,
        created_date:string,
        modified_date:string 
    ) {
        this.id = id
        this.egov_request = egov_request
        this.egov_quota = egov_quota
        this.position_or_grade = position_or_grade
        this.head_of_department_name = head_of_department_name
        this.head_of_department_position = head_of_department_position
        this.head_of_department_email = head_of_department_email
        this.ministry_name = ministry_name
        this.division_name = division_name
        this.agency_name = agency_name
        this.department_name = department_name
        this.created_date = created_date
        this.modified_date
    }
}

export class DocumentRequest {
    public id: string
    public remarks: string
    public user: string
    public created_date: string
    public modified_date: string
    constructor(
        id: string,
        remarks: string,
        user: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.remarks = remarks
        this.user = user
        this.created_date = created_date
        this.modified_date = modified_date
    }
}