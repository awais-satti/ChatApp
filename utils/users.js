const users = [];
function userJoin(id,username,room){
    const user = {id,username,room}

    users.push(user)
    return user;
}
//find user
function getCurrentUser(id){
return users.find(user=>user.id===id)
}
//leave user

function leaveUser(id){
    const index = users.findIndex(user=>user.id===id)
    if(index !==-1){
    return users.splice(index,1)[0]
    }
}

 const getRoomUsers = ((room)=>{
    return users.filter(user=>user.room === room)   
})

module.exports = {
    userJoin,
    getCurrentUser,
    leaveUser,
    getRoomUsers
}