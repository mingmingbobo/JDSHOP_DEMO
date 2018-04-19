import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule, JsonpModule } from '@angular/http';

import { CartPage } from '../pages/cart/cart';
import { CategorysPage } from '../pages/categorys/categorys';
import { HomePage } from '../pages/home/home';
import { UserPage } from '../pages/user/user';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RegistersignPage } from '../pages/registersign/registersign';
import { RegisterpasswordPage } from '../pages/registerpassword/registerpassword';
import { SearchPage } from '../pages/search/search';
import { ProductlistPage } from '../pages/productlist/productlist';
import { ProductcontentPage } from '../pages/productcontent/productcontent';
import { PersonalPage } from '../pages/personal/personal';




import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { StorageProvider } from '../providers/storage/storage';

@NgModule({
  declarations: [
    MyApp,
    CategorysPage,
    CartPage,
    UserPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    ProductcontentPage,
    PersonalPage
  ],
  imports: [
    HttpModule, 
    JsonpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategorysPage,
    CartPage,
    UserPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    ProductcontentPage,
    PersonalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    StorageProvider
  ]
})
export class AppModule {}
