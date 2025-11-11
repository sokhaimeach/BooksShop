import { Routes } from "@angular/router";
import { Dashboard } from "./Dashboard/dashboard/dashboard";
import { Books } from "./Dashboard/books/books";
import { Authors } from "./Dashboard/authors/authors";
import { Users } from "./Dashboard/users/users";
import { Orders } from "./Dashboard/orders/orders";
import { Home } from "./home/home";
import { Bookpage } from "./bookpage/bookpage";
import { Authorpage } from "./authorpage/authorpage";
import { Categorypage } from "./categorypage/categorypage";
import { Detail } from "./detail/detail";
import { Wishlist } from "./wishlist/wishlist";
import { Cart } from "./cart/cart";
import { Contact } from "./contact/contact";
import { About } from "./about/about";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: Home },
  { path: "book", component: Bookpage },
  { path: "author", component: Authorpage },
  { path: "category/:category", component: Categorypage },
  { path: "about", component: About },
  { path: "contact", component: Contact },
  { path: "detail", component: Detail },
  { path: "wishlist", component: Wishlist },
  { path: "cart", component: Cart },
  {
    path: "dashboard",
    component: Dashboard,
    children: [
      { path: "", redirectTo: "books", pathMatch: "full" },
      { path: "books", component: Books },
      { path: "authors", component: Authors },
      { path: "users", component: Users },
      { path: "orders", component: Orders },
    ],
  },
];
