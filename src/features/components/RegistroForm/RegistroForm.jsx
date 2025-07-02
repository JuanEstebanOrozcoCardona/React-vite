import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const RegistroForm = ({ setShowRegistro }) => {
  const [form, setForm] = useState({ correo: '', clave: '' });
  const [errors, setErrors] = useState({ correo: '', clave: '' });

  const validate = (name, value) => {
    switch (name) {
      case 'correo':
        if (!value) return 'Campo requerido';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido';
        return '';
      case 'clave':
        if (!value) return 'Campo requerido';
        if (!/^[A-Za-z0-9]+$/.test(value)) return 'Solo letras y números, sin símbolos';
        if (value.length < 6) return 'Mínimo 6 caracteres';
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

  const isFormValid =
    Object.values(errors).every((e) => e === '') &&
    Object.values(form).every((f) => f !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      localStorage.setItem('usuarioRegistrado', JSON.stringify(form));
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: `Bienvenido, ${form.correo}`,
      });
      setForm({ correo: '', clave: '' });
      setErrors({ correo: '', clave: '' });
      if (setShowRegistro) setShowRegistro(false);
    }
  };

  return (
    <section className="registro-form">
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>
            Correo*
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />
          </label>
          {errors.correo && <small className="error">{errors.correo}</small>}
        </div>
        <div className="form-group">
          <label>
            Clave*
            <input
              type="password"
              name="clave"
              value={form.clave}
              onChange={handleChange}
              required
            />
          </label>
          {errors.clave && <small className="error">{errors.clave}</small>}
        </div>
        <button type="submit" disabled={!isFormValid}>
          Registrarse
        </button>
      </form>
      {setShowRegistro && (
        <button className="close-modal" onClick={() => setShowRegistro(false)}>
          X
        </button>
      )}
    </section>
  );
};

export default RegistroForm;