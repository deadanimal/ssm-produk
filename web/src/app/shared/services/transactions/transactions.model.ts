export class Transaction {
  public id: string
  public cart: string
  public total_amount: string
  public payment_status: string
  public payment_gateway_update_date: string
  public payment_gateway_order_id: string
  public created_date: string
  public modified_date: string

  constructor(
    id: string,
    cart: string,
    total_amount: string,
    payment_status: string,
    payment_gateway_update_date: string,
    payment_gateway_order_id: string,
    created_date: string,
    modified_date: string
  ) {
    this.id = id
    this.cart = cart
    this.total_amount = total_amount
    this.payment_status = payment_status
    this.payment_gateway_update_date = payment_gateway_update_date
    this.payment_gateway_order_id = payment_gateway_order_id
    this.created_date = created_date
    this.modified_date = modified_date
  }
}
