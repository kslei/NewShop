import { makeAutoObservable } from "mobx";

export default class NewStore {
  constructor() {
    this._news = []
    makeAutoObservable(this)
  }

  setNews(news) {
    this._news = news
  }

  get news() {
    return this._news
  }
}