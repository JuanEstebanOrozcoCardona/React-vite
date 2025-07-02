import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../../shared/styles/style.css';

const LoginForm = ({ setShowLogin }) => {
  const [form, setForm] = useState({ correo: '', clave: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));
    if (
      usuarioRegistrado &&
      usuarioRegistrado.correo === form.correo &&
      usuarioRegistrado.clave === form.clave
    ) {
      // Guardar sesión
      localStorage.setItem('usuarioSesion', JSON.stringify({ correo: form.correo }));
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: `Bienvenido de nuevo, ${form.correo}`,
      });
      setShowLogin(false);
      window.location.reload(); // Para actualizar la navbar
    } else {
      setError('Correo o clave incorrectos o usuario no registrado');
    }
  };

  return (
    <section className="registro-form">
      <h3>Iniciar Sesión</h3>
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
        </div>
        {error && <small className="error">{error}</small>}
        <button type="submit">
          Entrar
        </button>
      </form>
      {setShowLogin && (
        <button className="close-modal" onClick={() => setShowLogin(false)}>
          X
        </button>
      )}
    </section>
  );
};

export default LoginForm;