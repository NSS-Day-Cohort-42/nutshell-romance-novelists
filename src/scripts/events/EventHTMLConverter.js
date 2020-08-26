import {deleteEvent} from "./EventsDataProvider.js"

const eventHub = document.querySelector(".container")

//eventListener listening for the Delete Button to be click and then invoking the deleteEvent function to update database
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteEventButton--")){
        const [prompt, eventId] = clickEvent.target.id.split("--")

        deleteEvent(eventId)
    }
})

//dispatching the click for the Event Edit button. Attaches the event Id to the event so the form can listen for that and know which event needs to be edited. 
eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("editEventButton--")){
        const [prompt, eventId] = clickEvent.target.id.split("--")

        const customEvent = new CustomEvent("editEventButtonClicked", {
            detail: {
                eventId: parseInt(eventId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("showEventDetailsButton--")){
        const [prompt, eventId] = clickEvent.target.id.split("--")

        return description = eventId.description

    }
})

export const eventHTML = (eventObj) => {
    return `
    <section class="event">
        <div class="event--name"> ${eventObj.name} </div>
        <div class="event--date"> ${eventObj.date} </div>
        <div class="event--time"> ${eventObj.time} </div>
        <div class="event--location">${eventObj.location}</div>
        <button class="button" id="weatherButton--${eventObj.id}"> Show Weather </button>
        <button class="button" id="showEventDetailsButton--${eventObj.id}"> Event Details </button>
        <button class="button" id="editEventButton--${eventObj.id}"> Edit </button>
        <button class="button" id="deleteEventButton--${eventObj.id}"> Delete </button>
        <div class="event--description"> ${description} </div>
    </section>
    `
}