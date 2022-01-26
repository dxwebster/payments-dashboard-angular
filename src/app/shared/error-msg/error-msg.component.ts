import { Component, OnInit, Input } from "@angular/core"
import { FormControl } from "@angular/forms"
import { FormErrorMessages } from "../../helpers/form-error-messages"

@Component({
  selector: "app-error-msg",
  templateUrl: "./error-msg.component.html",
  styleUrls: ["./error-msg.component.scss"],
})
export class ErrorMsgComponent implements OnInit {
  @Input() control: FormControl
  @Input() label: string

  @Input() msgErro: string
  @Input() mostrarErro: boolean

  constructor() {}

  ngOnInit() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormErrorMessages.getErrorMsg(this.label, propertyName, this.control.errors[propertyName])
      }
    }

    return null
  }
}
