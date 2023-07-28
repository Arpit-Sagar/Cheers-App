let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
// let url ="https://themealdb.com/api/json/v1/1/search.php?s=";

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
         let len=data.drinks.length;
         for(let i=0;i<len;i++)
         {
          console.log(data.drinks[i]);
          let myDrink = data.drinks[i];
          // let videoUrl = myDrink.strVideo;
          // console.log(videoUrl);
          // // let videoId = videoUrl ? videoUrl.split("v=")[1] : "";
          // let videoId = "";
          // if (videoUrl) {
          // let match = videoUrl.match(/[?&]v=([^?&]+)/);
          //  if (match) {
          //     videoId = match[1];
          //      }
          //  }
          console.log(myDrink.strDrink);
          console.log(myDrink.strDrinkThumb);
          console.log(myDrink.strInstructions);
          // console.log(myDrink.strYoutube);
          let count = 1;
          let ingredients = [];
          for (let i in myDrink) 
          {
            let ingredient = "";
            let measure = "";
            if (i.startsWith("strIngredient") && myDrink[i]) {
              ingredient = myDrink[i];
              if (myDrink[`strMeasure` + count]) {
                measure = myDrink[`strMeasure` + count];
              } else {
                measure = "";
              }
              count += 1;
              ingredients.push(`${measure} ${ingredient}`);
            }
          }
          console.log(ingredients);
          html += `
           <img src=${myDrink.strDrinkThumb}>
             <h2>${myDrink.strDrink}</h2>
              <h3>Ingredients:</h3>
              <ul class="ingredients">${ingredients.map(item => `<li>${item}</li>`).join("")}</ul>
              <h3>Instructions:</h3>
              <p>${myDrink.strInstructions}</p>
              
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