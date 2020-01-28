import { Component, OnInit } from '@angular/core';
import { select, insert } from '../../../firebase-srv/app.js';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public inserir(){
    insert('', '');
  }
}
