import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  
  @Output() onFiltrar = new EventEmitter<any>();

  // Objeto para almacenar los filtros
  filtros = {
    nombre: '',
    categoria: '',
    precioMin: 0,
    precioMax: 99,
    activo: false,
  };

  // Aplica los filtros y emite el evento
  aplicarFiltros(): void {
    this.onFiltrar.emit(this.filtros);
  }

  // Restaura los valores iniciales
  reset(): void {
    this.filtros = {
      nombre: '',
      categoria: '',
      precioMin: 0,
      precioMax: 99,
      activo: false,
    };
    this.aplicarFiltros();
  }
}