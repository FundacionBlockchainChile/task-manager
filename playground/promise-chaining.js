require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5e66ed5e0c618d05b87cd248', { age: 3 }).then((user) => {
//     // console.log(user)
//     return User.countDocuments({ age : 3})
// }).then((result) => {
//     console.log(result)
    
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeCount('5e66ca839f8e324d246be81e', 10).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})