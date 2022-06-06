$(".room_links").click(selectSuite);
$("#book_now").click(setRoom);
let remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
if (remote_array === null) {
    default_rooms_array();
}
render_rooms();



function selectSuite(){
    let blah = $(this).attr('data-suite');
    $("#book_now").attr('data-room_type', blah);
    alert($("#book_now").attr('data-room_type'));

}

//make room type array([ price/night, # of rooms, floor number, #of smoking rooms, Bed types, premium restaurant access, microwave, stove, mini-fridge])
//add smoking and bed types to the array
function default_rooms_array(){
    let room_types = {
            Emperor: [500,5,500,0,"King",true,true,true,true],
            Romance: [400,5,400,0,"Queen",true,true,false,true],
            Family: [300,10,300,0,"Two Double, One Single",false,true,true,true],
            Double: [200,10,200,0,"Two Double",false,true,false,true],
            Economy: [100,10,100,5,"One Double",false,false,false,true]
    };

    let room_list = [];

    for (let key in room_types) {
        $("<ul>").attr('id', key).appendTo($(" #roomTypes "));
        for(i=0;i<room_types[key][1];i++){
            room_list.push({
                room_number: room_types[key][2]+i,
                price: room_types[key][0],
                type: key,
                booked: false,
                bed_type: room_types[key][4],
                premium_access_restaurant: room_types[key][5],
                microwave: room_types[key][6],
                stove: room_types[key][7],
                fridge: room_types[key][8],
                name: "",
                surname: "",
                email: "",
                phone: "",
                adult_guests: "",
                child_guests: "",
                start_stay: "",
                end_stay: "",
                early_checkin: false,
                check_in: 11,
                check_out: 16,
                late_checkout: false
            });
        }
    }
    localStorage.setItem("Rooms_List", JSON.stringify(room_list));
}



//function to display rooms that are saved in local storage on the home page
function render_rooms(){
    var remote_array = JSON.parse(localStorage.getItem("Rooms_List"));

    if (remote_array !== null) {        
        
        for(i=0; i<remote_array.length; i++){          
                            

                let list_item = $("<li>");
                //let link = $("<button>").addClass("rooms_button").text(remote_array[i].room_number);
                let link = $("<div>").addClass("rooms_block").text(remote_array[i].room_number);
                link.appendTo(list_item);

                let target = remote_array[i].type;
                let availability;
                if(remote_array[i].booked == false){
                    availability = "avail_rooms";
                }else{
                    availability = "booked_rooms";
                }
                if($('#'+availability+'_'+target).length>0){
                    list_item.appendTo($('#'+availability+'_'+target));
                }else{
                    let room_type = $("<h2>").text(target);
                    let list = $("<ul>").attr("id", availability+'_'+target);
                    list_item.appendTo(list);
                    room_type.appendTo($('#'+availability));
                    list.appendTo($('#'+availability));
                }
            
        }
    }
}



// set the rooms as booked based on form assume this info is coming from the form inputs
function setRoom(){
    let type = $('input[name="type"]:checked').val();
    let name = $('#fullName').val();
    let surname = $('#lastName').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let adult_guests = $('#adults').val();
    let child_guests = $('#children').val();
    let start_stay = $('#dateStart').val();
    let end_stay = $('#dateEnd').val();
    let early_checkin = false; //boolean
    let late_checkout = false; //boolean

    // Get array from local storage


        for(i=0; i<remote_array.length; i++){          

            if(remote_array[i].booked == false){
                if(remote_array[i].type === type){
                    remote_array[i].booked = true;
                    remote_array[i].name = name;
                    remote_array[i].surname = surname;
                    remote_array[i].email = email;
                    remote_array[i].phone = phone;
                    remote_array[i].adult_guests = adult_guests;
                    remote_array[i].child_guests = child_guests;
                    remote_array[i].start_stay = start_stay;
                    remote_array[i].end_stay = end_stay;
                    remote_array[i].early_checkin = early_checkin;
                    remote_array[i].late_checkout = late_checkout;
                    break;
                }
            }
        }
        localStorage.setItem("Rooms_List", JSON.stringify(remote_array));

        $("#avail_rooms").empty();
        $("#booked_rooms").empty();

        render_rooms();
}
