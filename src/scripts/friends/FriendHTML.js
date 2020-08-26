import { deleteUserFriends, useUserFriends, saveUserFriends } from "../users/usersDataProvider.js"

let userFriends = useUserFriends()
const eventHub = document.querySelector(".container")

const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

export const friendHTML = (user) => {
    if (user.friend){
        return `
        <div class=friendsListCard>
        <p class="friendUserName">${user.username}</p>
        <button id="deleteFriend" value="${user.id}">Delete Friend</button>
        </div>
        `
    }
    if (!user.friend){
        return `
        <div class=friendsListCard>
        <p class="friendUserName">${user.username}</p>
        <button id="addFriend" value="${user.id}">Add Friend</button>
        </div>
        `
    }
}

eventHub.addEventListener("click", event => {
    if (event.target.id === "deleteFriend"){
        debugger
        const friendId = parseInt(event.target.value)
        const relationshipObj = userFriends.find(r => {
            if(currentUserId === r.userId || currentUserId === r.friendId){
                if(friendId === r.userId || friendId === r.friendId){
                    return r
                }else{
                    console.log("!")
                }
            }else{
                console.log("!")
            }
        })
        deleteUserFriends(relationshipObj.id)
    }
    if (event.target.id === "addFriend"){
        const newObj = {
            userId: currentUserId,
            friendId: parseInt(event.target.value)
        }
        saveUserFriends(newObj)
    }
})