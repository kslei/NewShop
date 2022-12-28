import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._orders = []
    this._deliveries = []
    this._selectedDelivery = []
    makeAutoObservable(this)
  }

  setOrders(orders) {
    this._orders = orders
  }

  setDeliveries(deliveries) {
    this._deliveries = deliveries
  }

  setSelectedDelivery(delivery) {
    this._selectedDelivery = delivery
  }

  get orders() {
    return this._orders
  }

  get deliveries() {
    return this._deliveries
  }

  get selectedDelivery() {
    return this._selectedDelivery
  }

}