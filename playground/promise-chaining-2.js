require("../src/db/mongoose");
const Task = require("../src/models/task");

// Find One Task by Id and then console log number of incopleted Tasks...
// Task.findByIdAndDelete("5e66e8c86fc64947d815b458")
//   .then(deletedTask => {
//     console.log(deletedTask);
//     return Task.countDocuments({ completed: false }).then(result =>
//       console.log("There are " + result + " incompleted tasks...")
//     );
//   })
//   .catch(e => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed: true })
  return count
}

deleteTaskAndCount('5e66eae5bb5ffd3190d701af').then((count) => {
  console.log(count)
}).catch((e) => {
  console.log(e)
})