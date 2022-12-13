import { makeAutoObservable } from "mobx";

export default class OrderStore {
  constructor() {
    this._userId = []
    this._devices = []
    this._status = []
    this._delivery = []
    makeAutoObservable(this)
  }

  setTypes(userId) {
    this._userId = userId
  }

  setDevices(devices) {
    this._devices = devices
  }

  setSelectedType(status) {
    this._status = status
  }

  setSelectedBrand(delivery) {
    this._delivery = delivery
  }

  get userId() {
    return this._userId
  }

  get devices() {
    return this._devices
  }

  get status() {
    return this._status
  }
  get delivery() {
    return this._delivery
  }

}