import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { MachineComponent } from './pages/machine/machine.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {path: 'historico', component: HistoryComponent},
  {path: 'cliente', component: ClientComponent},
  {path: 'maquina', component: MachineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
