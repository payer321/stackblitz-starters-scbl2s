let express = require('express');
let app = express();
let port = 3000;

let cors = require('cors');

app.use(cors());

//sample data

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

//Endpoint 1: Add an Activity
//finction
function addActivity(activities, activityId, type, duration, caloriesBurned) {
  for (i = 0; i < activities.length; i++) {
    if (activities[i].activityId != activityId) {
      activities.push({
        activityId: activityId,
        type: type,
        duration: duration,
        caloriesBurned: caloriesBurned,
      });
    }
  }
  return activities;
}
app.get('/activities/add', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let result = addActivity(activityId, type, duration, caloriesBurned);
  res.json(result);
});
//Endpoint 2: Sort Activities by Duration
//function
function sortActivitiesByDuration(activity1, activity2) {
  return activity1.duration - activity2.duration;
}
app.get('activities/sort-by-duration', (req, res) => {
  let durationCopy = activities.slice();
  durationCopy.sort(sortActivitiesByDuration);
  res.json(durationCopy);
});
//Endpoint 3: Filter Activities by Type
//function
function filterActivitiesByType(activity, type) {
  return activity.type === type;
}
app.get('activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activity) =>
    filterActivitiesByType(activity, type)
  );
  res.json({ activities: result });
});
//Endpoint 4: Calculate Total Calories Burned
//function
function calculateTotalCaloriesBurned(activity) {
  for (let i = 0; i < activities.length; i++) {
    activity += activities[i].caloriesBurned;
  }
  return activity;
}
app.get('activities/total-calories', (req, res) => {
  let totalCalories = 0;
  let result = calculateTotalCaloriesBurned(totalCalories);
  res.json({ totalCalories: result });
});
//Endpoint 5: Update Activity Duration by ID
//function
function updateActivityDurationById(activity, activityId, duration) {
  for (let i = 0; i < activity.length; i++) {
    if (activity[i] === activityId) {
      activity[i].duraton = duration;
    }
  }
  return activity;
}
app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = updateActivityDurationById(activityId, activityId, duration);
  res.json({ activities: result });
});
app.listen(port, () => {
  console.log(`server is started on port ${port}`);
});
