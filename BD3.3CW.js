let express = require("express");
let app = express();
let port = 3000;
//sample data
let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
  },
];

//Exercise 1: Update the Watched Status of a Video by ID
//function
function updateWatchedStatusById(watchList , videoId,watched)
{
  for(let i= 0; i < watchList.length; i++)
    {
      if(watchList[i].videoId === videoId)
      {
        watchList[i].watched = watched;
        break;
      }
    }
  return watchList;
}
//Endpoint 1: update the watched status of a video by ID

app.get("/watchlist/update",(req,res)=>{
  let videoId = parseInt(req.query.videoID);
  let watched = req.query.watched === "true";
  let result =updateWatchedStatusById(watchList , videoId , watched);
  res.json({result});
})
//Exercise 2: Update the Watched Status of All Videos
//functiom
function updateAllVideosWatchedStatus(watchList , watched)
{
  for(let i = 0; i < watchList.length; i++)
    {
      watchList[i].watched = watched;
    }
  return watchList;
}
//endpoint 2 update the watched status of all videos

app.get("/watchlist/update-all",(req ,res) =>{
  let watched = req.query.watched === "true";
  let result = updateAllVideosWatchedStatus(watchList , watched);
  res.json(result);
});

//Exercise 3: Delete a Video by ID
//funcion to check if video should be deleted by ID
function shouldDeleteById(video , videoId)
{
  return video.videoId !== videoId;
}
//Endpoint #:Delete a video by ID
app.get("/watchlist/delete",(req , res) =>{
  let videoId = parseInt(req.query.videoId);
  let result = watchList.filter(video => shouldDeleteById(video , videoId));
  watchList =result; //update watch list with filteredresult
  res.json(result);
});

//Exercise 4: Delete Watched Videos
//function to check if a video is watched
function isWatched(video)
{
  return !video.watched;
}
//Endpoint 4: Delete watched videos
app.get("/watchlist/delete-watched",(req ,res)=>{
  let result = watchList.filter(video => isWatched(video));
  watchList = result;//update the watch List with the filtered result
  res.json(result);
})


app.listen(port,()=>{
  console.log(`server is started on port ${port}`)
})
