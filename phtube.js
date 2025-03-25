
const loadCategories=()=>{
fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
.then(res=>res.json())
.then(data=>{
    displayCategories(data.categories)
})
}
loadCategories()

const displayCategories=(categories)=>{
    const categoryContainer = document.getElementById('btn-container');

    for (let cat of categories){
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
    <button onclick="loadCategoryVideos(${cat.category_id})" class="btn bg-slate-100 btn-md rounded-md hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.append(newDiv);
    }
   
}

const loadVideos=()=>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res=>res.json())
    .then(data=>{
        displayVideos(data.videos);
    })
}


const displayVideos=(videos)=>{
  
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    if(videos.length == 0){
        videoContainer.innerHTML = `
         <div class="flex flex-col justify-center items-center col-span-full space-y-4 py-20">
               <img src="./assets/Icon.png" alt="">
               <h4 class="text-2xl font-bold">Opps!! Sorry, There is no content here.</h4>
          </div>
        `
        return;
    }
    videos.forEach(video => {
        const newDiv = document.createElement("div");
        newDiv.innerHTML=`
             <div class="card bg-base-100">
               <figure class="relative" >
                 <img
                   src="${video.thumbnail}" class="rounded-lg w-full h-[150px] object-cover"/>
                    <span class=" absolute text-white bg-gray-600 px-1 rounded-lg bottom-2 right-2">3hrs 56 min ago</span>
               </figure>
              <div class="flex my-5" >
               <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 h-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
               <div class="ml-2">
                    <h2 class="card-title text-lg font-bold">${video.title}
                  </h2>
                  <p class="text-md flex gap-1 text-gray-400 items-center">${video.authors[0].profile_name} <img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="" class="h-5 w-5"></p>
                  <p class="text-lg">${video.others.views} views</p>
                  </div>
              </div>
             </div>
        `
        videoContainer.append(newDiv);
    });
  
}

const loadCategoryVideos=(id)=>{
   const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

   fetch(url)
   .then(res=>res.json())
   .then(data=>{
   displayVideos(data.category);
   })
}

