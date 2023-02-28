const elMovieList = document.querySelector(".js-movie-list"); 
const elMoviForim = document.querySelector(".js-movie-form");
const elMoveInput = document.querySelector(".js-input");
const modalMoviesTitle = document.querySelector(".modal__title");
const modalMoviesIframe = document.querySelector(".modal__iframe");
const modalMoviesRatong = document.querySelector(".modal__rating");
const modalMoviesYear = document.querySelector(".modal__year");
const modalMoviesTime = document.querySelector(".modal__time");
const modalMoviesDecs = document.querySelector(".modal__categories");
const modalMoviesSummary = document.querySelector(".modal__summary");
const modalMoviesLink = document.querySelector(".modal__link");
const elModal = document.querySelector(".modal"); 
const elModalSelect = document.querySelector(".movie-select-js");
const elInpMin = document.querySelector(".js-input-movi-year-max");
const elInpMax = document.querySelector(".js-input-movi-year-min");
const moveSortTitle = document.querySelector(".move__sort__title");
const moveSortYear = document.querySelector(".move__sort__year"); 
const bookmarList = document.querySelector(".bookmarl-list");

//-----------------------------------------fulmove arry------------------------
const fulMoveArry = []; 
//---------------------------------bookmark uchun arry---------------------------
const bookArry = [];

function catigoryMove(){ 
  
movies.forEach(item => { 

    item.categories.forEach(catigory => { 
       

        if(!fulMoveArry.includes(catigory)){ 

            fulMoveArry.push(catigory);
        }

    });
});

fulMoveArry.sort()


};
 
function rendrCatigory(){ 
  
    const catigoiryFragment = document.createDocumentFragment();

    fulMoveArry.forEach(item => { 

      const catigoryValue = document.createElement("option");
      catigoryValue.textContent = item;
      catigoryValue.value = item;
      
      catigoiryFragment.appendChild(catigoryValue);
    }); 

    elModalSelect.appendChild(catigoiryFragment);
}
// -------------------------------------------------------Get time------------------------------------------- 

function getTime(time) {
  
    const hour = Math.floor(time / 60);
    const minut = Math.floor(time % 60);

    return `${hour} hs ${minut} min`

}

// ------------------------------------------------------Render movies-------------------------------------------

function renderMovie(movie, regex = ""){

    const elMovieTemplate = document.querySelector(".movie__template").content;
    const movieFragment = document.createDocumentFragment(); 

       elMovieList.innerHTML = "";

    movie.forEach(item => {

        const elMovieClone = elMovieTemplate.cloneNode(true);
        elMovieClone.querySelector(".movie__img").src = item.poster_max;
        elMovieClone.querySelector(".movie__img").alt = item.title;   

          if(regex.source != "(?:)" && regex){ 

            elMovieClone.querySelector(".movie__title").innerHTML = String(item.title).replace(regex, `<mark class"">${ 
                   
              regex.source.toLowerCase()

            }</mark>`);  

          }else{ 

            elMovieClone.querySelector(".movie__title").textContent = String(item.title).slice(0, 40);  
          }
        elMovieClone.querySelector(".movie__rating").textContent = item.imdb_rating;
        elMovieClone.querySelector(".movie__year").textContent = item.movie_year;
        elMovieClone.querySelector(".movie__time").textContent = getTime(item.runtime);
        elMovieClone.querySelector(".movie__description").textContent = item.categories.join(" ");
        elMovieClone.querySelector(".movies__btn").dataset.movieId = item.imdb_id;
        elMovieClone.querySelector(".item_star").dataset.bookmarkId = item.title;

       

        movieFragment.appendChild(elMovieClone)
    });

    elMovieList.appendChild(movieFragment)
} 

//----------------------------------------------------------bookmark move star------------------------------ 


function bookmarkMovie(book, node){

  const elMovieTemplate = document.querySelector(".movie__template").content;
  const movieFragment = document.createDocumentFragment(); 

   bookmarList.innerHTML = "";

   book.forEach((item, index)=> {

      const elMovieClone = elMovieTemplate.cloneNode(true);

      elMovieClone.querySelector(".movie__img").src = item.poster_max;
      elMovieClone.querySelector(".movie__img").alt = item.title;    
      elMovieClone.querySelector(".movie__title").textContent = String(item.title).slice(0, 40);
      elMovieClone.querySelector(".movie__rating").textContent = item.imdb_rating;
      elMovieClone.querySelector(".movie__year").textContent = item.movie_year;
      elMovieClone.querySelector(".movie__time").textContent = getTime(item.runtime);
      elMovieClone.querySelector(".movie__description").textContent = item.categories.join(" ");
      elMovieClone.querySelector(".movies__btn").dataset.movieId = item.imdb_id;
      elMovieClone.querySelector(".dalet-btn").dataset.daletId = index; 
      elMovieClone.querySelector(".item_star").classList.add("d-none");
      elMovieClone.querySelector(".dalet-btn").classList.remove("d-none");

  
      movieFragment.appendChild(elMovieClone);
  });

  node.appendChild(movieFragment);
};
 //--------------------------------------------------------movie modal start--------------------------------
  
function renderMovesFind(renderFindMoves){ 

     modalMoviesTitle.textContent = renderFindMoves.title; 
     modalMoviesIframe.src = renderFindMoves.yotube_iframa_link;
     modalMoviesRatong.textContent = renderFindMoves.imdb_rating;
     modalMoviesYear.textContent = renderFindMoves.movie_year;
     modalMoviesTime.textContent = getTime(renderFindMoves.runtime);
     modalMoviesDecs.textContent = renderFindMoves.categories.join(" ");
     modalMoviesSummary.textContent = renderFindMoves.summary;
     modalMoviesLink.href = renderFindMoves.imdb_id_link;

}


                                    // Event Delegation 


//--------------------------------------------movie btn dataset------------------------------------------ 

   elMovieList.addEventListener("click", function(evt){ 

    if(evt.target.matches(".movies__btn")){ 

      const btnId = evt.target.dataset.movieId;

      const findMovie = movies.find(item => item.imdb_id === btnId);

      renderMovesFind(findMovie);       
      
    }; 
    

     if(evt.target.matches(".item_star")){ 


         const bookmarkBtnId = evt.target.dataset.bookmarkId; 

         const bookIdIndex = movies.find(text => text.title === bookmarkBtnId);

         if(!bookArry.includes(bookIdIndex)){ 

            bookArry.push(bookIdIndex);

            bookmarkMovie(bookArry, bookmarList);
         }
     }
       console.log(bookArry);
   }); 
  
//---------------------------------------------bookmarkListga event delegeshin yozgan joymiz------------------------------------------
  

  bookmarList.addEventListener("click", function(evt){ 

     if(evt.target.matches(".dalet-btn")){ 

         const daletIdeBookmark = evt.target.dataset.daletId;
         
         bookArry.splice(daletIdeBookmark, 1);

         bookmarkMovie(bookArry, bookmarList);
     }

  })

//----------------------------------modalaga event delegation yozgan joymiz-------------------
   elModal.addEventListener("hidden.bs.modal", function(){ 

    modalMoviesIframe.src = "";

   })  

   elMoviForim.addEventListener("submit", function(evt){ 
       
       evt.preventDefault(); 
       
    //--------------------------------------Title sort stert-----------------------------
       const titleSortArry = [];

        if(moveSortTitle.value == 'Aa-Zz'){ 


            const Aa = movies.sort((a, b) =>{ 
         
                const elA = String(a.title).toUpperCase();
                const elB = String(b.title).toUpperCase();
       
               if(elA > elB){ 

                return 1;
               }else if(elA < elB){ 

                return -1;
               }else{ 

                return 0;
               }
       
              });

              titleSortArry.push(Aa);


        } 

        if(moveSortTitle.value == 'Zz-Aa'){ 

            const Zz = movies.sort((a, b) => { 

              const elZ = String(a.title).toUpperCase();
              const elX = String(b.title).toUpperCase();

              if(elZ < elX){ 

                return 1;
              }else if(elZ > elX){ 

                return -1;
              }else{ 

                return 0;
              }

            });

            titleSortArry.push(Zz);
        };
      
//------------------------------------------title sort end--------------------------------

//-------------------------------------------year sort start------------------------------


      const yearSortArry = [];
       
      if(moveSortYear.value == "2000"){ 

          const num1 = movies.sort((a, b) => a.movie_year - b.movie_year);

          yearSortArry.push(num1);
      }
      if(moveSortYear.value == "2018"){ 

        const num2 = movies.sort((a, b) => b.movie_year - a.movie_year);

        yearSortArry.push(num2);
      }

      
    //----------------------------------------year sort end--------------------------------   
       const searchInpValue = elMoveInput.value.trim();

       const regexTitle = new RegExp(searchInpValue, "gi");

       const searchMoveArry = movies.filter(item => { 
       
   
         const searchCatigory = String(item.title).match(regexTitle) && (elModalSelect.value == "all" || item.categories.includes(elModalSelect.value)) && (elInpMin.value == "" || item.movie_year >= elInpMin.value) 
         && (elInpMax.value == "" || item.movie_year <= elInpMax.value); 
         
         return searchCatigory;

       });

       if(searchMoveArry.length > 0){ 

        renderMovie(searchMoveArry, regexTitle)

       }else{ 
         
      
        elMovieList.innerHTML = "Movie not fount"

       };
   });


   
   catigoryMove();
   rendrCatigory();
   renderMovie(movies.slice(0, 100));
 
   



















