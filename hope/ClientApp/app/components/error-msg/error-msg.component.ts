import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent {

    @Input() msg: string = " invalid field ";

}