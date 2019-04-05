import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UistateService {
  private _collapsed: BehaviorSubject<Boolean> = new BehaviorSubject(false);
  private _hideText: BehaviorSubject<Boolean> = new BehaviorSubject(false);

  collapsed: Observable<Boolean> = this._collapsed.asObservable();
  hideText: Observable<Boolean> = this._hideText.asObservable();

  constructor() {}

  setHideText(isHide: Boolean) {
    this._hideText.next(isHide);
  }

  setCollapsed(isCollapsed: Boolean) {
    this._collapsed.next(isCollapsed);
  }
}
