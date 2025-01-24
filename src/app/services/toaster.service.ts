import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Success') {
    this.toastr.success(message, title, { progressBar: true });
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, { progressBar: true });
  }

  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title, { progressBar: true });
  }
}
