export class ProductCart {
    public id: string;
    public entity: string;
    public entity_registration_number: string;

    constructor(
        id: string,
        entity_registration_number: string,
        entity: string
    ) {
        this.id = id;
        this.entity_registration_number = entity_registration_number;
        this.entity = entity;
    }
}