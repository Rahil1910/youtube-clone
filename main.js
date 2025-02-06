document.getElementById("toggle").addEventListener('click', function() {
    document.querySelector(".toggle-sidebar").classList.toggle("show");
    document.querySelector(".sidebar").classList.toggle("show");
    document.querySelectorAll(".sidebar-btn").forEach(function(e) {
        e.classList.toggle("show");
    });
    document.querySelector(".filter-btn").classList.toggle("shrink");
    document.querySelector('.video-container').classList.toggle("shrink");
    document.querySelectorAll('.video').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.img').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.thumbnail').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.icon-title-chName').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.icon-title').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.title').forEach(function(e) {
        e.classList.toggle("shrink");
    });
    
    document.querySelectorAll('.ch-name').forEach(function(e) {
        e.classList.toggle("shrink");
    });
  });

import YOUR_API_KEY from "./API_CONSTANTS.js";
//console.log(YOUR_API_KEY);
const video_http = "https://www.googleapis.com/youtube/v3/videos?";
const channel_http = "https://www.googleapis.com/youtube/v3/channels?";

const videoCardContainer = document.querySelector('.video-container');

const numberOfVideo = 30;
 
const generateQueryParams = new URLSearchParams({
    key : YOUR_API_KEY,
    part:"snippet, contentDetails",
    chart:"mostPopular",
    maxResults:numberOfVideo,
    regionCode:"IN",
})
//console.log(video_http + generateQueryParams);
fetch(video_http + generateQueryParams)
    .then((res)=>res.json())
    .then((data)=>{
        data.items.forEach((video)=>{
            getChannelIcon(video);
        }) 
    })
    .catch((Error)=>console.log(Error));

const getChannelIcon = (video_data)=>{
    fetch(channel_http + new URLSearchParams({
        key:YOUR_API_KEY,
        part:"snippet",
        id:video_data.snippet.channelId,
    }))
    .then((res)=>res.json())
    .then((data)=>{
        video_data.channelIcon = data.items[0].snippet.thumbnails.default.url;
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.high.url;
        console.log(video_data);
        makeVideoCard(video_data);
    })
    .catch((error)=>console.log(error));
}

const makeVideoCard = (data)=>{
     const videoCard = document.createElement('div');
     videoCard.classList.add('video');
     videoCard.addEventListener('click',()=>{
        window.location.href=""; 
     })
     videoCard.innerHTML = `
     <div class="img">
     <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="thumbnail">
     </div>
     <div class="icon-title-chName">
        <div class="icon-title">
            <img src="${data.channelIcon}" class="icon" alt="icon">
            <h4 class="title">${data.snippet.title}</h4>
        </div>
        <p class="ch-name">${data.snippet.channelTitle}</p>
    </div>
`  
videoCardContainer.appendChild(videoCard);
}