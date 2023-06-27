import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor () {
    this._isAuth = false
    this._user = {}
    this._name = {}
    this._role = {}
    this._id = {}
    makeAutoObservable(this)
  }

  setIsAuth (bool) {
    this._isAuth = bool
  }

  setUser (user) {
    this._user = user
  }

  setName (name) {
    this._name = name
  }
  setEmail (email) {
    this._email = email
  }

  setRole (role) {
    this._role = role
  }
  
  setId (id) {
    this._id = id
  }

  get isAuth () {
    return this._isAuth
  }

  get user () {
    return this._user
  }

  get name () {
    return this._name
  }

  get email () {
    return this._email
  }

  get role () {
    return this._role
  }

  get id () {
    return this._id
  }

}