import { Component } from '@angular/core';

import { CartPage } from '../cart/cart';
import { CategorysPage } from '../categorys/categorys';
import { HomePage } from '../home/home';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategorysPage;
  tab3Root = CartPage;
  tab4Root = UserPage;

  constructor() {

  }
}
