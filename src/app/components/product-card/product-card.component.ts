import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../interfaces/iproduct';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() productoSeleccionado: IProduct = this.crearProductoDefault();
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() notificarMensaje: EventEmitter<string> = new EventEmitter();

  edicionActiva: boolean = false;

  modelForm: FormGroup;

  constructor(private productService: ProductService) {
    this.modelForm = new FormGroup({
      _id: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      price: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl(null, [
        Validators.pattern(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)([\/\w\-._~:?#[\]@!$&'()*+,;=]*)?$/),
      ]),
      active: new FormControl(true)
    }, []);
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.modelForm.get(formControlName)?.hasError(validador) && this.modelForm.get(formControlName)?.touched;
  }

  // Envía los cambios realizados al servicio
  onSubmit(): void {
    if (this.modelForm.valid) {
      const productoActualizado: IProduct = this.modelForm.value;
      this.productService.actualizarProducto(productoActualizado);
      this.notificarMensaje.emit('Producto actualizado correctamente.');
      this.cerrar();
    } else {
      console.log('Formulario inválido');
    }
  }

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
    this.modelForm.setValue(this.productoSeleccionado);
  }

  // Elimina un producto por su ID, llamando al servicio para eliminarlo, y actualiza la lista de productos
  eliminarProducto(id: string) {
    this.productService.eliminarProducto(id);
    this.notificarMensaje.emit('Producto eliminado correctamente.'); 
    this.cerrar();
  }

  // Emite la señal para que se cierre el modal en el componente padre
  cerrar(): void {
    this.cerrarModal.emit();
  }

  // Cancela la edición y restaura el producto a sus valores originales
  cancelar(): void {
    this.edicionActiva = false;
  }

}