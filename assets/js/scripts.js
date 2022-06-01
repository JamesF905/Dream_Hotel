//make room array

//room number
//room type
//room price per night
//room booked (true, false)
//room # of guests
//room start_stay(date)
//room end_stay(date)
//room check_in(date)
//room check_out(date)


let room_list = [
    {
        room: 201, 
        type: "emperor suite", 
        price: 250.99, 
        booked: true,
        guest_count: "",
        start_stay: "",
        end_stay: "",
        check_in: "",
        check_out: ""
    }
]


for(i=0; i<room_list.length; i++){



}

let time_row = $("<li>")

function update_room_list(){
    var remote_array = JSON.parse(localStorage.getItem("Rooms_list"));
    if (remote_array !== null) {        
        for(i=0; i<remote_array.length; i++){
            let target = $(".time-block[data-time='"+remote_array[i][0]+"'] > textarea");
            target.val(remote_array[i][1]);
        }
    }
}

localStorage.setItem("Rooms_List", JSON.stringify(remote_array));