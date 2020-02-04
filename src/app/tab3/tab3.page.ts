import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {  

  machines = [
    {name: 'teste1', value:'teste11'},
    {name: 'teste2', value:'teste12'},
    {name: 'teste3', value:'teste13'},
  ];

  constructor() {}

}
