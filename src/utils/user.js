const users=[]

const addUser=({id,username,room})=>{
    if(!username){
        return{
            error:'session expired'  
        }
    }

    const existingUser=users.find((user)=>{
        return  user.username===username && user.room===room
    })

    if(existingUser){
        return {
            error:'username matches try with different name'
        }
    }

    const user={id,username,room}
    users.push(user)
    return {user}

}


const removeUser=(id)=>{
    const index=users.findIndex((user)=> user.id===id)
    if(index!==-1){
        return users.splice(index,1)[0]
    }
}

const getUser=(id)=>{
    return users.find((user)=>user.id===id)
}


const getUserRoom=(room)=>{
    return users.filter((user)=>user.room===room)
}

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserRoom
}