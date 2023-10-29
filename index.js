document.addEventListener('DOMContentLoaded', () => {
  let orderForm = document.querySelector('#orderForm');
  let input = document.querySelector('input[name="order"]');
  let mealDisplay = document.querySelector('.d-display');
  let modalDisplay = document.querySelector('#modal-display');
  let orderValue = input.value;


  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/data/${orderValue}`)
      .then((res) => res.json())
      .then((meals) => {
       
        let cards = '';
        for (let meal of meals) {
       let card = `
      <div class="single" id="${meal.id}">
      <p> ${meal.id}</p>
           <h4>${meal.name}</h4>
          <img src="${meal.image}">
          <p>${meal.description}</p>
           <button class="like-button">Like</button>
           <span class="like-count">likes ${meal.likes}</span>
        </div>
        `;
          cards += card;
        }
        mealDisplay.innerHTML = cards;
//modal display so when clicked it appears on the modal display div 
        let allMeals = document.querySelectorAll('.single');
        allMeals.forEach((meal) => {
          meal.addEventListener('click', (e) => {
      let found = meals.find((food) => food.id === parseInt(e.target.id));
     displayMealModal(found);
          });
        });

        let likeButtons = document.querySelectorAll('.like-button');
        likeButtons.forEach((button) => {
       button.addEventListener('click', () => {
      let mealId = button.parentElement.id;
        let meal = meals.find((food) => food.id === parseInt(mealId));
            if (meal) {
          meal.likes++; // Increment the likes for this specific meal
          updateLikeCount(button, meal.likes);
            }
          });
        });
      });
  });
//comment form
  document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let comment = document.getElementById('comment');
    let commentTerm = comment.value;
    let paragraph = document.createElement('p');
    paragraph.textContent = commentTerm;

    let commentSection = document.getElementById('comment-section');
    commentSection.appendChild(paragraph);
  });
//when found is called in displaymealmodal a meal is shown
  function displayMealModal(meal) {
    if (meal) {
      let modal = `
        <div>
          <h4>${meal.name}</h4>
          <img src="${meal.image}">
          <p>${meal.description}</p>
        </div>
      `;
      modalDisplay.innerHTML = modal;
    }
 }
  

  function updateLikeCount(button, likes) {
    let likeCount = button.nextElementSibling;
    likeCount.textContent = `likes ${likes}`;
  }
});
