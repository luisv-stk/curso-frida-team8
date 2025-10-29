import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TableComponent } from '../../components/table/table.component'; 
import { CartComponent } from '../../components/cart/cart.component'; 
import { NotificationComponent } from '../../components/notification/notification.component';


/**
 * Página de área personal que incluye la tabla usando TableComponent.
 */
@Component({
  selector: 'app-personal-area-page',
  standalone: true,
  imports: [CommonModule, TableComponent, CartComponent, NotificationComponent], // TableComponent incluido
  templateUrl: './personal-area-page.html',
  styleUrls: ['./personal-area-page.css']
})
export class PersonalAreaPage implements OnInit {
  showNotification = false;
  notificationMessage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Check for query parameters to show notification
    this.route.queryParams.subscribe(params => {
      if (params['showNotification'] === 'true') {
        this.showNotification = true;
        this.notificationMessage = params['message'] || 'Operación completada correctamente';
        
        // Hide notification after 5 seconds
        setTimeout(() => {
          this.showNotification = false;
        }, 5000);
      }
    });
  }
}
