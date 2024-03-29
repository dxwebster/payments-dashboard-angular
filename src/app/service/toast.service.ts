﻿import { Injectable } from "@angular/core"
import { Router, NavigationStart } from "@angular/router"
import { Observable, Subject } from "rxjs"

@Injectable({ providedIn: "root" })
export class ToastService {
  private subject = new Subject<any>()
  private keepAfterRouteChange = false

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          this.keepAfterRouteChange = false
        } else {
          this.clear()
        }
      }
    })
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable()
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange
    this.subject.next({ type: "success", text: message })
    this.clear()
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange
    this.subject.next({ type: "error", text: message })
    this.clear()
  }

  clear() {
    setTimeout(() => {
      this.subject.next()
    }, 2000)
  }
}
