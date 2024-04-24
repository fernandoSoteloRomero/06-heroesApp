import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AddNewHeroPageComponent } from './pages/add-new-hero-page/add-new-hero-page.component';
import { SearchHeroPageComponent } from './pages/search-hero-page/search-hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'new-hero',
        component: AddNewHeroPageComponent
      },
      {
        path: 'search-hero',
        component: SearchHeroPageComponent
      },
      {
        path: 'list-heroes',
        component: ListPageComponent
      },
      {
        path: 'edit/:id',
        component: AddNewHeroPageComponent
      },
      {
        path: ':id',
        component: HeroPageComponent
      },
      {
        path: '**',
        redirectTo: 'list-heroes'
      },
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
