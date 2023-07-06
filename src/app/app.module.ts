import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../app/header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list//shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    RecipesModule,
    ShoppingListModule,
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
