document.addEventListener('DOMContentLoaded', function () {
    const recipeContainer = document.getElementById('recipes');
    const searchForm = document.getElementById('searchForm');
    const closeButton = document.querySelector('.recipe-modal-close');
    const recipeModal = document.getElementById('recipe-modal');
  
    // Función para obtener las recetas de la API
    async function fetchRecipes(query = '') {
      try {
        let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        if (query) {
          url += query; // Si hay una consulta, se agrega al final de la URL
        }
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.meals); // Llama a la función para mostrar las recetas
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  
    // Función para mostrar las recetas en la página
    function displayRecipes(recipes) {
      recipeContainer.innerHTML = ''; // Limpia el contenedor antes de agregar las nuevas recetas
  
      if (recipes) {
        recipes.forEach(recipe => {
          const recipeCard = document.createElement('div');
          recipeCard.classList.add('recipe-card');
          recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
          `;
          recipeContainer.appendChild(recipeCard);
  
          // Agregar evento de clic a la tarjeta de receta
          recipeCard.addEventListener('click', () => {
            showRecipeDetails(recipe);
          });
        });
      } else {
        recipeContainer.innerHTML = '<p>No se encontraron recetas. Intenta una nueva búsqueda.</p>';
      }
    }
  
    // Función para mostrar los detalles de una receta en el modal
    function showRecipeDetails(recipe) {
        const recipeDetails = document.getElementById('recipe-details');
      
        // Limpiar el contenido del modal antes de mostrar los nuevos detalles
        recipeDetails.innerHTML = '';
      
        // Crear el contenido HTML con los detalles de la receta
        const recipeHTML = `
          <h2>${recipe.strMeal}</h2>
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <h3>Ingredientes:</h3>
          <ul>
            ${getIngredientsList(recipe)}
          </ul>
          <h3>Instrucciones:</h3>
          <p>${recipe.strInstructions}</p>
        `;
      
        // Agregar el contenido HTML al modal
        recipeDetails.innerHTML = recipeHTML;
      
        // Mostrar el modal
        recipeModal.style.display = 'block';
      }
      
      // Función auxiliar para obtener la lista de ingredientes
      function getIngredientsList(recipe) {
        let ingredientsList = '';
        for (let i = 1; i <= 20; i++) {
          const ingredient = recipe[`strIngredient${i}`];
          const measure = recipe[`strMeasure${i}`];
          if (ingredient && measure) {
            ingredientsList += `<li>${ingredient} - ${measure}</li>`;
          }
        }
        return ingredientsList;
    }
  
    // Evento para el envío del formulario de búsqueda
    searchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Evita el envío del formulario
      const query = document.getElementById('query').value.trim();
      fetchRecipes(query); // Realiza la búsqueda con la consulta ingresada
    });
  
    // Evento para cerrar el modal al hacer clic en la cruz
    closeButton.addEventListener('click', function() {
        recipeModal.style.display = 'none';
    });
  
    // Obtener las recetas iniciales sin consulta
    fetchRecipes();
  });
