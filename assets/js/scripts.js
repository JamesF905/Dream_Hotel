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


let room_list = [];

let room_types = {
        Emperor: [500,5,500], 
        Romance: [400,5,400], 
        Double: [300,10,300], 
        Family: [200,10,200],
        Economy: [100,10,100]
};

for (let key in room_types) {
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






/*
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
]*/



/*

for(i=0; i<room_list.length; i++){



}

let time_row = $("<li>")

function update_roomList(){
    var remote_array = JSON.parse(localStorage.getItem("Rooms_list"));
    if (remote_array !== null) {        
        for(i=0; i<remote_array.length; i++){
            let time_row = $("<li>")
            let target = $(".time-block[data-time='"+remote_array[i][0]+"'] > textarea");
            target.val(remote_array[i][1]);
        }
    }
}

localStorage.setItem("Rooms_List", JSON.stringify(remote_array));*/