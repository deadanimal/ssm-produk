export class ProductCart {
    public id: string;
    public entity: string;
    public entity_registration_number: string;
    public product_type: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        entity: string,
        entity_registration_number: string,
        product_type: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id;
        this.entity = entity;
        this.entity_registration_number = entity_registration_number;
        this.product_type = product_type
        this.created_date = created_date
        this.modified_date = modified_date
    }
}