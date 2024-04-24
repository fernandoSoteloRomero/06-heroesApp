import { Component } from '@angular/core';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styles: ``
})
export class AddNewHeroPageComponent {
  public publishers = [
    {id: 'DC Comics', value:'DC - Comics'},
    {id: 'Marvel Comics', value:'Marvel - Comics'},
  ]
}
