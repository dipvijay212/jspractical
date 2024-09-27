

let mainSection = document.getElementById("data-list-wrapper");

let productdetails=[]


function myfunction(){
    fetch("http://localhost:3000/pitches")
    .then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        productdetails=data;
        display(data);
    }).catch((err)=>{
        console.log("ERROR 404",err);
    })
}

myfunction();

function display(prod){
    prod.map((product)=>{
      let store1=show(product.image,product.id,product.founder,product.category,product.price,product.title);
        mainSection.innerHTML+=store1;
    })

}



function show(image,id,founder,category,price,title) {
    let store = `<div class="card-list">
    <div class="card" data-id="${id}">
      <div class="card-img">
        <img src="${image}" alt="${title}">
      </div>
      <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <p class="card-founder">${founder}</p>
        <p class="card-category">${category}</p>
        <p class="card-price">${price}</p>
        <a href="#" data-id="${id}" class="card-link">Edit</a>
        <button class="card-button" data-id="${id}">Delete</button>
      </div>
    </div>
  </div>`;
    return store;
  }
  

// pitch
let TitleInput = document.getElementById("pitch-title");
let ImageInput = document.getElementById("pitch-image");
let CategoryInput = document.getElementById("pitch-category");
let founderInput = document.getElementById("pitch-founder");
let PriceInput = document.getElementById("pitch-price");
let CreateBtn = document.getElementById("add-pitch");


CreateBtn.addEventListener('click',()=>{
    let details={
        title:TitleInput.value,
        image:ImageInput.value,
        category:CategoryInput.value,
        founder:founderInput.value,
        price:PriceInput.value,
       
       
    }  



    fetch("http://localhost:3000/pitches",{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(details),
    }).then((rec)=>{
        return rec.json();
    }).then((data)=>{
        console.log(data);
        display(data);
    }).catch((err)=>{
        console.log("ERROR 404",err);
    })
})


 

document.addEventListener('click',(el)=>{
    if(el.target.classList.contains("card-button")){
        alert("conform to delete");
         deletedata(el.target.dataset.id);
    }
    
})

function deletedata(id){
    fetch(`http://localhost:3000/pitches/${id}`,{
        method:"DELETE",
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log("ERROR 404",err); 
    })
}



// let filterFood = document.getElementById("filter-Food");
// let filterElectronics = document.getElementById("filter-Electronics");
// let filterPersonalCare = document.getElementById("filter-Personal-Care");
 

// filterFood.addEventListener("click", () => {
//     let data1 = productdetails.filter((el) => {
//       return el.category === "Food";
//     });

//      mainSection.innerHTML = "";
//     display(data1);
//   });

  
//   filterElectronics.addEventListener("click", () => {
//     let data1 = productdetails.filter((el) => {
//       return el.category === "Electronics";
//     });

//      mainSection.innerHTML = "";
//     display(data1);
//   });

  
//   filterPersonalCare.addEventListener("click", () => {
//     let data1 = productdetails.filter((el) => {
//       return el.category === "Personal Care";
//     });

//      mainSection.innerHTML = "";
//     display(data1);
//   });
  


let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");


sortAtoZBtn.addEventListener('click',()=>{
     let price=productdetails.filter((el)=>{
        return el.price;
     })
     let sortdata=price.sort((a,b)=>{
        return a.price-b.price;
     })
     
     mainSection.innerHTML = "";
     display(sortdata);
})

sortZtoABtn.addEventListener('click',()=>{
    let price=productdetails.filter((el)=>{
        return el.price;
    })
    let sorthigh=price.sort((a,b)=>{
        return b.price-a.price;
    })
    mainSection.innerHTML = "";
    display(sorthigh);
    
})

//Search by title/founder

// let searchBySelect = document.getElementById("search-by-select");
// let searchByInput = document.getElementById("search-by-input");
// let searchByButton = document.getElementById("search-by-button");
// searchByButton.addEventListener('click', () => {
//     let searchBy = searchBySelect.value;
//     if(searchBy==="title"){
//         let searchValue = searchByInput.value;
//         let search = productdetails.filter((details) => {
//           return details.title===searchValue;
//         })
//         mainSection.innerHTML="";
//         display(search);
//     }else if(searchBy==="founder"){
//         let searchValue = searchByInput.value;
//         let search = productdetails.filter((details) => {
//           return details.founder===searchValue;
//         })
//         mainSection.innerHTML="";
//         display(search);
//     }else{
//         alert("wrong input");
//     }
//   })


let upPitchIdInput = document.getElementById("update-pitch-id");
let upPitchTitleInput = document.getElementById("update-pitch-title");
let upPitchImageInput = document.getElementById("update-pitch-image");
let upPitchfounderInput = document.getElementById("update-pitch-founder");
let upPitchCategoryInput = document.getElementById("update-pitch-category");
let upPitchPriceInput = document.getElementById("update-pitch-price");
let upPitchBtn = document.getElementById("update-pitch");

document.addEventListener('click',(el)=>{
  if(el.target.classList.contains("card-link")){
    editdata(el.target.dataset.id);
  }
  
})


function editdata(id){
 fetch(`http://localhost:3000/pitches/${id}`)
 .then((res)=>{
   return res.json();
 }).then((data)=>{
    console.log(data);
    upPitchIdInput.value=data.id;
    upPitchTitleInput.value=data.title;
    upPitchImageInput.value=data.image;
    upPitchfounderInput.value=data.founder;
    upPitchCategoryInput.value=data.category;
    upPitchPriceInput.value=data.price;
 }).catch((err)=>{
  console.log("error 404",err);
 })
}

upPitchBtn.addEventListener('click',()=>{

   let updateobj ={
    id:upPitchIdInput.value,
    title: upPitchTitleInput.value,
    image: upPitchImageInput.value,
    price: upPitchPriceInput.value,
    founder: upPitchfounderInput.value,
    category: upPitchCategoryInput.value
  }
 
   fetch(`http://localhost:3000/pitches/${updateobj.id}`,{
     method:"PUT",
     headers:{
       'Content-Type':'application/json',
     },
     body:JSON.stringify(updateobj)
        }).then((res)=>{
          return res.json();
        }).then((data)=>{
           console.log(data);
        }).catch((err)=>{
          console.log("Erorr 404",err);
        })

})



let upPricePitchId = document.getElementById("update-price-pitch-id");
let upPricePitchPrice = document.getElementById("update-price-pitch-price");
let upPricePitchPriceButton = document.getElementById("update-price-pitch");



document.addEventListener('click',(el)=>{
  if(el.target.classList.contains("card-link")){
     editprice(el.target.dataset.id);
  }
})

function editprice(id){
  fetch(`http://localhost:3000/pitches/${id}`)
  .then((res)=>{
    return res.json();
  }).then((data)=>{
    console.log(data);
    upPricePitchId.value=data.id;
    upPricePitchPrice.value=data.price;
  })
 
  upPricePitchPriceButton.addEventListener('click',()=>{
    let updateprice={
      id:upPricePitchId.value,
      price:upPricePitchPrice.value,
    }

   fetch(`http://localhost:3000/pitches/${updateprice.id}`,{
    method:"PATCH",
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(updateprice)
   }).then((res)=>{
    return res.json()
   }).then((data)=>{
    console.log(data);
   }).catch((err)=>{
    console.log("Erorr 404",err);
   })

  })
}


