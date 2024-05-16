document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form");
    const nameInput = document.getElementById("name");
  
    form.addEventListener("submit", function(event) {
      if (!validateName(nameInput.value)) {
        event.preventDefault();
        alert("El campo nombre no puede contener números.");
      }
    });
  
    function validateName(name) {
      return /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
    }
  });
  
