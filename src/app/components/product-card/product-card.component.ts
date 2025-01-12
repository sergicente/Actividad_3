import { FormsModule } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {


  @Input()
  productoSeleccionado: IProduct = this.crearProductoDefault();
  @Output() borrarProducto: EventEmitter<string> = new EventEmitter;
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() guardarCambios: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() cancelarEdicion: EventEmitter<void> = new EventEmitter<void>();
  @Output() notificarCambios: EventEmitter<void> = new EventEmitter<void>();

  edicionActiva: boolean = false;
  productoEditable: IProduct = { ...this.productoSeleccionado };
  formularioInvalido: boolean = false;

  // Crea un producto vacío por defecto
  private crearProductoDefault(): IProduct {
    return {
      _id: '',
      active: false,
      category: '',
      description: '',
      image: '',
      name: '',
      price: 0,
    };
  }

  // Activa el modo edición y duplica el producto seleccionado, esto es util en caso de que se cancele la edición
  editarProducto(): void {
    this.edicionActiva = true;
    this.productoEditable = { ...this.productoSeleccionado };
  }

  // Realiza validaciones en el formulario, como que los campos no estén vacíos y que el precio sea un número válido
  validarFormulario(): boolean {
    return (
      this.productoEditable.name.trim() !== '' &&
      this.productoEditable.name.trim().length > 3 &&
      this.productoEditable.description.trim() !== '' &&
      this.productoEditable.description.trim().length > 3 &&
      !isNaN(Number(this.productoEditable.price)) &&
      Number(this.productoEditable.price) > 0
    );
  }

  // Guarda los cambios realizados en el producto
  guardarProducto(): void {
    this.formularioInvalido = false;
    this.guardarCambios.emit({ ...this.productoEditable });
    this.edicionActiva = false;
    this.notificarCambios.emit();
  }

  // Cancela la edición y restaura el producto a sus valores originales
  cancelar(): void {
    this.cancelarEdicion.emit();
    this.edicionActiva = false;
    this.productoEditable = { ...this.productoSeleccionado };
  }

  // Emite la señal para que se cierre el modal en el componente padre
  cerrar(): void {
    this.cerrarModal.emit();
  }

  // Función vinculada al evento (change) del elemento <select> del formulario.
  // Actualiza la categoría del producto cuando el usuario selecciona una opción en el menú desplegable.
  seleccionarCategoria(event: Event): void {
    this.productoEditable.category = (event.target as HTMLSelectElement).value;
  }

}