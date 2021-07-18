import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.css']
})
export class CatalogosComponent implements OnInit {


  constructor(
    private as:AuthService
  ) { 
  }

  ngOnInit(): void {
    this.as.sysadminAuth();
  }


}
