document.addEventListener('DOMContentLoaded', () => {
    let orderForm = document.querySelector('#orderForm');
    let listItem = document.querySelector('#listItem'); 
    let foodName = document.querySelector('#foodName');
    let foodDescription = document.querySelector('#foodDescription');
    let foodImage = document.querySelector('#foodImage');
   
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let input = document.querySelector('input[name="orderForm"]');
        let orderValue = input.value;

        fetch(`http://localhost:3006/data/${orderValue}`)
            .then(res => res.json())
        .then(data=>{
                //console.log(data);
                // or update the following
                if (data.id) {
              foodName.textContent = data.name;
            foodDescription.textContent = data.description;
               foodImage.src = data.image;}
             else if (orderValue === "items")
             {listItem.innerHTML = ""; // Clear previous data

            // Filter and display all items
            data.filter(item => item.id).forEach(item => {
                let itemDiv = document.createElement('div');
                let itemName = document.createElement('h3');
                let itemDescription = document.createElement('p');
                let itemImage = document.createElement('img');

                itemName.textContent = item.name;
                itemDescription.textContent = item.description;
                itemImage.src = item.image;

                itemDiv.appendChild(itemName);
                itemDiv.appendChild(itemDescription);
                itemDiv.appendChild(itemImage);

                listItem.appendChild(itemDiv);

   
            }
            )}
          });
    });
     //   });

    //const likeBtn =document.querySelector('#likeButton');
//const likeCount = document.querySelector('#like-count');
     //let counts = {
       // likes: 0
     // }
     //likeBtn.addEventListener('click', ()=>{
        //likeBtn.innerHTML == "Like";
       // counts.likes++;
        //likeCount.innerHTML = counts.likes + " likes";
    // })
     //}
   
const likeBtn =document.querySelector('#likeButton');
const likeCount = document.querySelector('#like-count');
    
     let count = 0;
     likeBtn.addEventListener('click',()=>{
        count++;
        likeCount.innerHTML = count + " likes";
     })
/*
  function submitComment (){
    //grab the comment entered
    let comment = document.getElementById('commentForm').value;
    //create a paragraph
    let paragraph = document.createElement("p")
    comment.addEventListener('submit', (e)=>{

e.preventDefault();
paragraph.textContent = comment;

commentSection.appendChild(paragraph)
submitComment()
    })
   }

*/
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
//function submitComment() {
    let comment = document.getElementById('comment')
    let commentTerm = comment.value
    let paragraph = document.createElement("p");
    paragraph.textContent = commentTerm;

    let commentSection = document.getElementById('comment-section');
    commentSection.appendChild(paragraph);
//}
//submitComment()
});

});
