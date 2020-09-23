export class CBIDTicket {
    public id: string
    public requestor: string
    public amount: number
    public remarks: string
    public entity_type: string
    public product_type: string
    public status: string
    public pending_date: string
    public completed_date: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        requestor: string,
        amount: number,
        remarks: string,
        entity_type: string,
        product_type: string,
        status: string,
        pending_date: string,
        completed_date: string,
        created_date: string,
        modified_date: string 
    ) {
        this.id = id
        this.requestor = requestor
        this.amount = amount
        this.remarks = remarks
        this.entity_type = entity_type
        this.product_type = product_type
        this.status = status
        this.pending_date = pending_date
        this.completed_date = completed_date
        this.created_date = created_date
        this.modified_date = modified_date
    }
}