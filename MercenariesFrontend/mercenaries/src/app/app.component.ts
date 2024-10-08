import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OfferComponent } from "./offer/offer.component";
import { MenuComponent } from "./menu/menu.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OfferComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mercenaries';
}
