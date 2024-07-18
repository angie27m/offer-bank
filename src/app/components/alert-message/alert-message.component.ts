import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    public snackBarRef: MatSnackBarRef<AlertMessageComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
  }

  ngOnInit() {}

  /** Dismisses the snack bar. */
  dismiss() {
    this.snackBarRef.dismiss();
  }

}
