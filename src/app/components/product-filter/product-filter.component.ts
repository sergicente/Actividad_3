import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ifiltro } from '../../interfaces/ifiltro';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  
  @Output() onFiltrar = new EventEmitter<any>();

  // Objeto para almacenar los filtros por defecto, usamos undefined para poder dejar el campo vacío
  filtros: Ifiltro = {
    nombre: '',
    categoria: '',
    precioMin: undefined,
    precioMax: undefined,
    activo: true,
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
      precioMin: undefined,
      precioMax: undefined,
      activo: true,
    };
    this.aplicarFiltros();
  }
}