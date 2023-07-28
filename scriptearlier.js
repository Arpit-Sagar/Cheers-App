let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
// let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let url ="https://themealdb.com/api/json/v1/1/search.php?s=";

let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } 
  else
  {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        console.log(data);
        let html="";
         let len=data.meals.length;
         for(let i=0;i<len;i++)
         {
          
          let myMeal = data.meals[i];
          console.log(myMeal);
          // let videoUrl = myMeal.strVideo;
          // console.log(videoUrl);
          // // let videoId = videoUrl ? videoUrl.split("v=")[1] : "";
          // let videoId = "";
          // if (videoUrl) {
          // let match = videoUrl.match(/[?&]v=([^?&]+)/);
          //  if (match) {
          //     videoId = match[1];
          //      }
          //  }
          console.log(myMeal.strMeal);
          console.log(myMeal.strMealThumb);
          console.log(myMeal.strInstructions);
          // console.log(myMeal.strYoutube);
          let count = 1;
          let ingredients = [];
          for (let i in myMeal) 
          {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myMeal[i]) {
              ingredient = myMeal[i];
              if (myMeal[`strMeasure` + count]) {
                measure = myMeal[`strMeasure` + count];
              } else {
                measure = "";
              }
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          console.log(ingredients);
          html += `
           <img src=${myMeal.strMealThumb}>
             <h2>${myMeal.strMeal}</h2>
              <h3>Ingredients:</h3>
              <ul class="ingredients">${ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
              <h3>Instructions:</h3>
              <p>${myMeal.strInstructions}</p>
              
              <hr> <!--adding a line break after each recipe-->
              <br>
        `;
        //iframe line embed video in html
          // let ingredientsCon = document.querySelector(".ingredients");
          // ingredients.forEach((item) => {
          //   let listItem = document.createElement("li");
          //   listItem.innerText = item;
           // ingredientsCon.appendChild(listItem);
            // html +=listItem.outerHTML;
         // });
         }
         result.innerHTML=html;
        })
      
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};


// window.addEventListener("load", getInfo);
window.addEventListener("load", () => {
  document.getElementById("user-inp").addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      getInfo();
    }
  });
});
searchBtn.addEventListener("click", getInfo);