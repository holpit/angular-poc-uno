import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnagraficaContainerComponent } from "./anagrafica-container/anagrafica-container.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/anagrafica" },
  { path: "anagrafica", component: AnagraficaContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
