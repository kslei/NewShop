import { makeAutoObservable } from "mobx";

export default class DiscountStore {
  constructor() {
    this._discount = []
    makeAutoObservable(this)
  }

  setDiscount(discount) {
    this._discount = discount
  }

  get discount() {
    return this._discount
  }
}