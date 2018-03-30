import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategorysPage } from './categorys';

@NgModule({
  declarations: [
    CategorysPage,
  ],
  imports: [
    IonicPageModule.forChild(CategorysPage),
  ],
})
export class CategorysPageModule {}
