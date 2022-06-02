//make room type array([price,# of rooms, floor number])
//add smoking and bed types to the array
let room_types = {
        Emperor: [500,5,500], 
        Romance: [400,5,400], 
        Double: [300,10,300], 
        Family: [200,10,200],
        Economy: [100,10,100]
};

let room_list = [];

for (let key in room_types) {
    $("<ul>").attr('id', key).appendTo($(" #rooms "));
    for(i=0;i<room_types[key][1];i++){
        room_list.push({
            room_number: room_types[key][2]+i,
            price: room_types[key][0],
            type: key,
            booked: false,
            guest_count: "",
            start_stay: "",
            end_stay: "",
            check_in: "",
            check_out: ""
        }); 
    }
}

localStorage.setItem("Rooms_List", JSON.stringify(room_list));

//function to display rooms that are saved in local storage on the home page
function render_rooms(){
    var remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
    if (remote_array !== null) {        
        for(i=0; i<remote_array.length; i++){          
            if(remote_array[i].booked == false){                
                let list_item = $("<li>");
                let link = $("<button>").addClass("rooms_button").text(remote_array[i].room_number);
                link.appendTo(list_item);
                list_item.appendTo($('#' + remote_array[i].type));
            }
        }
    }
}

render_rooms();

// set the rooms as booked based on form 