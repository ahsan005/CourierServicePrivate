import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventEmitterServiceService {
  constructor() {}
  private _subject = new Subject<any>();

  newEvent(event) {
    this._subject.next(event);
  }

  get events$() {
    return this._subject.asObservable();
  }
}
