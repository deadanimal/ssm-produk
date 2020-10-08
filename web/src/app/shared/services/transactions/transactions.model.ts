import { CartExtended } from '../carts/carts.model'
import { User } from '../users/users.model'

export class Transaction {
  public id: string
  public cart: string
  public total_amount: string
  public payment_status: string
  public payment_gateway_update_date: string
  public name: string
  public organisation: string
  public address1: string
  public address2: string
  public address3: string
  public postcode: string
  public city: string
  public country: string
  public email_address: string
  public phone_number: string
  public reference_no: string
  public payment_gateway_order_id: string
  public user: string
  public created_date: string
  public modified_date: string

  constructor(
    id: string,
    cart: string,
    total_amount: string,
    payment_status: string,
    payment_gateway_update_date: string,
    name: string,
    organisation: string,
    address1: string,
    address2: string,
    address3: string,
    postcode: string,
    city: string,
    country: string,
    email_address: string,
    phone_number: string,
    reference_no: string,
    payment_gateway_order_id: string,
    user: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id
    this.cart = cart
    this.total_amount = total_amount
    this.payment_status = payment_status
    this.payment_gateway_update_date = payment_gateway_update_date
    this.name = name
    this.organisation = organisation
    this.address1 = address1
    this.address2 = address2
    this.address3 = address3
    this.postcode = postcode
    this.city = city
    this.country = country
    this.email_address = email_address
    this.phone_number = phone_number
    this.reference_no = reference_no
    this.payment_gateway_order_id = payment_gateway_order_id
    this.user = user
    this.created_date = created_date
    this.modified_date = modified_date
  }
}

export class TransactionExtended {
  public id: string
  public cart: CartExtended
  public total_amount: string
  public payment_status: string
  public payment_gateway_update_date: string
  public name: string
  public organisation: string
  public address1: string
  public address2: string
  public address3: string
  public postcode: string
  public city: string
  public country: string
  public email_address: string
  public phone_number: string
  public reference_no: string
  public payment_gateway_order_id: string
  public user: User
  public created_date: string
  public modified_date: string

  constructor(
    id: string,
    cart: CartExtended,
    total_amount: string,
    payment_status: string,
    payment_gateway_update_date: string,
    name: string,
    organisation: string,
    address1: string,
    address2: string,
    address3: string,
    postcode: string,
    city: string,
    country: string,
    email_address: string,
    phone_number: string,
    reference_no: string,
    payment_gateway_order_id: string,
    user: User,
    created_date: string,
    modified_date: string
  ) {
    this.id = id
    this.cart = cart
    this.total_amount = total_amount
    this.payment_status = payment_status
    this.payment_gateway_update_date = payment_gateway_update_date
    this.name = name
    this.organisation = organisation
    this.address1 = address1
    this.address2 = address2
    this.address3 = address3
    this.postcode = postcode
    this.city = city
    this.country = country
    this.email_address = email_address
    this.phone_number = phone_number
    this.reference_no = reference_no
    this.payment_gateway_order_id = payment_gateway_order_id
    this.user = user
    this.created_date = created_date
    this.modified_date = modified_date
  }
}

export class TransactionPayment {
  public id: string
  public transaction: TransactionExtended
  public created_date: string
  public modified_date: string

  constructor(
    id: string,
    transaction: TransactionExtended,
    created_date: string,
    modified_date: string
  ) {
    this.id = id
    this.transaction = transaction
    this.created_date = created_date
    this.modified_date = modified_date
  }
}