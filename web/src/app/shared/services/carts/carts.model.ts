import { Entity } from '../entities/entities.model'
import { Product } from '../products/products.model'
import { SearchCriteria } from '../search-criterias/search-criterias.model'
import { ServiceRequestExtended } from '../service-requests/service-requests.model'

export class Cart {
    public id: string
    public total_price_before_tax: number
    public total_tax: number
    public total_price_after_tax: number
    public user: string
    public cart_status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        total_price_before_tax: number,
        total_tax: number,
        total_price_after_tax: number,
        user: string,
        cart_status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.total_price_before_tax = total_price_before_tax
        this.total_tax = total_tax
        this.total_price_after_tax = total_price_after_tax
        this.user = user
        this.cart_status = cart_status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class CartItem {
    public id: string
    public cart_item_type: string
    public cart: string
    public entity: string
    public product: string
    public service: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        cart_item_type: string,
        cart: string,
        entity: string,
        product: string,
        service: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.cart_item_type = cart_item_type
        this.cart = cart
        this.entity = entity
        this.product = product
        this.service = service
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class CartExtended {
    public id: string
    public total_price_before_tax: number
    public total_tax: number
    public total_price_after_tax: number
    public user: string
    public cart_status: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        cart_item: string,
        total_price_before_tax: number,
        total_tax: number,
        total_price_after_tax: number,
        user: string,
        cart_status: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.total_price_before_tax = total_price_before_tax
        this.total_tax = total_tax
        this.total_price_after_tax = total_price_after_tax
        this.user = user
        this.cart_status = cart_status
        this.created_date = created_date
        this.modified_date = modified_date
    }
}

export class CartItemExtended {
    public id: string
    public cart_item_type: string
    public cart: string
    public entity: Entity
    public product: Product
    public service_request: ServiceRequestExtended
    public product_search_criteria: SearchCriteria
    public image_form_type: string
    public image_version_id: string
    public quota: number
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        cart_item_type: string,
        cart: string,
        entity: Entity,
        product: Product,
        service_request: ServiceRequestExtended ,
        product_search_criteria: SearchCriteria,
        image_form_type: string,
        image_version_id: string,
        quota: number,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.cart_item_type = cart_item_type
        this.cart = cart
        this.entity = entity
        this.product = product
        this.service_request = service_request
        this.product_search_criteria = product_search_criteria
        this.image_form_type = image_form_type
        this.image_version_id = image_version_id
        this.quota = quota
        this.created_date = created_date
        this.modified_date = modified_date
    }
}