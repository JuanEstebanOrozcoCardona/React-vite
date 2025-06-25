import { useState } from 'react';
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const RegistroForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    nombre: 'Campo requerido',
    apellidos: 'Campo requerido',
    telefono: 'Campo requerido',
    email: 'Campo requerido'
  });

  const validate = (name, value) => {
    switch (name) {
      case 'nombre':
        if (!value) return 'Campo requerido';
        if (value.length < 5) return 'Mínimo 5 caracteres';
        if (value.length > 30) return 'Máximo 30 caracteres';
        return '';
      case 'apellidos':
        if (!value) return 'Campo requerido';
        if (value.length < 5) return 'Mínimo 5 caracteres';
        if (value.length > 30) return 'Máximo 30 caracteres';
        return '';
      case 'telefono':
        if (!value) return 'Campo requerido';
        if (!/^\d+$/.test(value)) return 'Solo números';
        if (value.length < 7 || value.length > 10) return 'Debe tener entre 7 y 10 dígitos';
        return '';
      case 'email':
        if (!value) return 'Campo requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Formato inválido';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const isFormValid = Object.values(errors).every((e) => e === '') &&
                      Object.values(form).every((f) => f !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      Swal.fire({
        icon: 'success',
        title: '¡Datos guardados correctamente!',
        text: `Gracias por registrarte, ${form.nombre}.`,
      });
      setForm({ nombre: '', apellidos: '', telefono: '', email: '' });
      setErrors({
        nombre: 'Campo requerido',
        apellidos: 'Campo requerido',
        telefono: 'Campo requerido',
        email: 'Campo requerido'
      });
    }
  };

  return (
    <section className="registro-form">
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleSubmit} noValidate>
        {['nombre', 'apellidos', 'telefono', 'email'].map((field) => (
          <div key={field} className="form-group">
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}*
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
              />
            </label>
            {errors[field] && <small className="error">{errors[field]}</small>}
          </div>
        ))}
        <button type="submit" disabled={!isFormValid}>
          Guardar
        </button>
      </form>
    </section>
  );
};

export default RegistroForm;
