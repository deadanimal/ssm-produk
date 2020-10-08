import { Service } from '../services/services.model'
import { User } from '../users/users.model'

export class ServiceRequest {
    public id: string
    public name: string
    public address: string
    public email_address: string
    public phone_number: string
    public service: string
    public remarks: string
    public completed: boolean
    public completed_date: string
    public user: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        address: string,
        email_address: string,
        phone_number: string,
        service: string,
        remarks: string,
        completed: boolean,
        completed_date: string,
        user: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.address = address
        this.email_address = email_address
        this.phone_number = phone_number
        this.service = service
        this.remarks = remarks
        this.completed = completed
        this.completed_date = completed_date
        this.user = user
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class ServiceRequestExtended {
    public id: string
    public name: string
    public address: string
    public email_address: string
    public phone_number: string
    public service: Service
    public remarks: string
    public completed: boolean
    public completed_date: string
    public user: User
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        name: string,
        address: string,
        email_address: string,
        phone_number: string,
        service: Service,
        remarks: string,
        completed: boolean,
        completed_date: string,
        user: User,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.name = name
        this.address = address
        this.email_address = email_address
        this.phone_number = phone_number
        this.service = service
        this.remarks = remarks
        this.completed = completed
        this.completed_date = completed_date
        this.user = user
        this.created_date = created_date
        this.modified_date = modified_date
    }
}