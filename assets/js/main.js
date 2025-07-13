// Elimina todo el contenido HTML y CSS, deja solo el JS funcional

document.addEventListener('DOMContentLoaded', function() {
  var btnSolicitar = document.getElementById('btnSolicitarPedido');
  var pedidoContainer = document.querySelector('.seccion-pedidos');
  var infoPina = document.getElementById('infoPina');
  var infoNaranja = document.getElementById('infoNaranja');
  var infoMango = document.getElementById('infoMango');
  var infoKiwi = document.getElementById('infoKiwi');
  var frutaSelect = document.querySelectorAll('.pedido-item select.form-select')[1];
  var btnCotizar = document.getElementById('btnCotizarEnvio');
  var cotizarFormContainer = document.getElementById('cotizarFormContainer');

  function ocultarInfo() {
    infoPina.style.display = 'none';
    infoNaranja.style.display = 'none';
    infoMango.style.display = 'none';
    infoKiwi.style.display = 'none';
  }

  if (btnSolicitar && infoPina && infoNaranja && infoMango && infoKiwi && frutaSelect && pedidoContainer) {
    btnSolicitar.addEventListener('click', function() {
      var fruta = frutaSelect.value;
      var frutaData = {};
      if (fruta === 'Piñas') {
        frutaData = {
          nombre: 'Piñas',
          imagen: 'assets/img/pina.png',
          texto: 'Las piñas son ricas en vitamina C y perfectas para refrescarte.',
          campo: 'assets/img/campopina.png'
        };
      } else if (fruta === 'Naranjas') {
        frutaData = {
          nombre: 'Naranjas',
          imagen: 'assets/img/naranja.png',
          texto: 'Las naranjas son jugosas y llenas de energía para tu día.',
          campo: 'assets/img/camponaranja.png'
        };
      } else if (fruta === 'Mangos') {
        frutaData = {
          nombre: 'Mangos',
          imagen: 'assets/img/mango.png',
          texto: 'Los mangos son dulces y deliciosos, ideales para postres.',
          campo: 'assets/img/campomango.png'
        };
      } else if (fruta === 'Kiwis') {
        frutaData = {
          nombre: 'Kiwis',
          imagen: 'assets/img/kiwi.png',
          texto: 'Los kiwis aportan fibra y antioxidantes para tu salud.',
          campo: 'assets/img/campokiwi.png'
        };
      }
      localStorage.setItem('frutaSeleccionada', JSON.stringify(frutaData));
      window.open('detalle-fruta.html', '_blank');
    });
  }
  if (btnCotizar && cotizarFormContainer) {
    btnCotizar.addEventListener('click', function() {
      cotizarFormContainer.style.display = 'block';
      btnCotizar.style.display = 'none';
    });
    var cotizarForm = document.getElementById('cotizarForm');
    if (cotizarForm) {
      cotizarForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // EmailJS envío
        emailjs.send('service_co420se', 'template_z05nv4l', {
          nombre: document.getElementById('cotizarNombre').value,
          correo: document.getElementById('cotizarCorreo').value,
          cajas: document.getElementById('cotizarCajas').value
        })
        .then(function() {
          alert('¡Solicitud de cotización enviada! Nos pondremos en contacto contigo pronto.');
          cotizarForm.reset();
          cotizarFormContainer.style.display = 'none';
          btnCotizar.style.display = 'inline-block';
        }, function(error) {
          alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
        });
      });
    }
  }
});