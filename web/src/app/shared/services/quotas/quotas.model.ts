export class Quota {
    public id: string
    public quota_type: string
    public quota: number
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        quota_type: string,
        quota: number,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.quota_type = quota_type
        this.quota = quota
        this.created_date = created_date
        this.modified_date = modified_date
    }
}