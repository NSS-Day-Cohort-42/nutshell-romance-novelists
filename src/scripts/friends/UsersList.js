import { getUsers, getUserFriends, useUsers, useUserFriends } from "../users/usersDataProvider.js"
import { friendHTML } from "./FriendHTML.js"

const contentTarget = document.querySelector(".allUserSearch")
const eventHub = document.querySelector(".container")
const currentUserId = parseInt(sessionStorage.getItem("activeUser"))

let users = []
let userFriends =[]

eventHub.addEventListener("friendsButtonClicked", () => {
    getUsers()
    .then(getUserFriends)
    .then(() => {
        users = useUsers()
        userFriends = useUserFriends()
        findFriends()
        render()
    })
    
})

eventHub.addEventListener("usersStateChanged", () => {
    findFriends()
    render()
})

eventHub.addEventListener("userFriendsStateChanged", () => {
    findFriends()
    render()
    
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "searchFriendsButton"){
        const searchTarget = document.querySelector("#searchFriends")
        const searchValue = searchTarget.value.toLowerCase()
        
        users = users.filter(user => user.username.toLowerCase().includes(searchValue))

    }
})


const findFriends = () => {
    let friends = []

    let currentRelationships = userFriends.filter(f => {
        if(currentUserId === f.userId || currentUserId === f.friendId ){
            return f
        }
    })
    
    friends = currentRelationships.map(r => {
        return users.find(user => {
            if(user.id === r.userId || user.id === r.friendId){
                if(user.id != currentUserId){
                    return user
                }
            }
        })
    })

    for (let i = 0; i < users.length; i ++) {
        
        if(users[i].id === currentUserId){
                users.splice(i, 1)

        }
    }

    users = users.map(user => {
        if (friends.includes(user)){
            user.friend = true
        }else{
            user.friend = false
        }
        return user
    })
}


const render = () => {
        
    const html = users.map(user => friendHTML(user)).join("")
    
    contentTarget.innerHTML =
        `
        <input type="text" id="searchFriends" placeholder="Search All Users">
        <button id="searchFriendsButton">Search</button>
        ${html}
        `
}