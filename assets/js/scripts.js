$("#book_now").click(setRoom);
//Set the default base rate to be used if the api call fails
const default_baseRate = 300;
const API_KEY = "8ed5daf921msh719ef71333f93fdp17181ejsn644b1e3ee862";
//get local storage status
remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
//create the local rooms array if it doesnt exist yet, otherwise render the rooms from local storage 
if(remote_array !== null){
    creatLocalDATA(default_baseRate);
    render_rooms(remote_array);
}else{
    setRates("06/09/2022", "06/10/2022");
}

//create rooms array
function setRates(check_in, check_out){
    //check if the api is running
    //Get the array of hotels near cancun
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
            'X-RapidAPI-Key': API_KEY
        }
    };
    
    fetch('https://hotel-price-aggregator.p.rapidapi.com/search?q=cancun', options)
    .then(function (response) {
        if (response.status !== 200) {
            //alert(`failed - ${response.status} error`);
            creatLocalDATA(default_baseRate);
        }else{
            //alert("success");
            return response.json();
        }
      })
    .then(function (d) {      
        compet = [];
        toot = {data:[]};
        for(i=0;i<d.length;i++){
            compet.push({name:d[i].shortName, address:d[i].address.address,city:d[i].address.city,country:d[i].address.country,hotelId:d[i].hotelId});
            toot.data.push({hotelId:d[i].hotelId,dates:[{checkIn:check_in,checkOut:check_out},{checkIn:check_in,checkOut:check_out}]});
        }
        sendTo = JSON.stringify(toot);            
        //Get the array of prices for hotels near cancun
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            },
            body: sendTo
        };

        return fetch('https://hotel-price-aggregator.p.rapidapi.com/batchRates', options)
        .then(function (response) {
            if (response.status !== 200) {
                //alert(`failed - ${response.status} error`);
                creatLocalDATA(default_baseRate);
            }else{
                //alert("success");
                return response.json();
            }
        })
        .then(function (data) {
            //combine the hotels array with the prices array by checking to see if the hotel i'd match, then using $.extend to combine them into a complete hotels array with prices included
            for(i=0; i<compet.length; i++){
                for (key of data) {
                    if(key.hotelId === compet[i].hotelId){
                        
                        //get the sources for the rates, turn into a smaller array
                        let rateSources = key.dates[0].rates.map(function(value) {
                            return {source: value.host, rate: value.rate};
                        });
                
                        //get the lowest rate for each hotal
                        let rates_array = key.dates[0].rates.map(function(value) {
                            return value.rate;
                        });
        
                        let minimum = Math.min.apply(Math, rates_array);
        
                        //make the new object to combine with the object in compet[i]
                        let obj= {Check_In: key.dates[0].checkIn, Check_Out: key.dates[0].checkOut, Rate_Sources: rateSources, Lowest_Rate: minimum};
                        
                        $.extend(compet[i], obj);
                        break;			
                    }
                }	
            } 
            
            let lowest_HOTEL_rates_ARRAY = compet.map(function(value) {
                return value.Lowest_Rate;
            });
        
            let adjusted_baseRate = Math.min.apply(Math, lowest_HOTEL_rates_ARRAY);        
            creatLocalDATA(adjusted_baseRate);
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))       
    
}

//make room type array([ price/night, # of rooms, floor number, #of smoking rooms, Bed types, premium restaurant access, microwave, stove, mini-fridge])
//add smoking and bed types to the array

function creatLocalDATA(baseRate){
    
    let room_types = {
            Emperor: {rate:baseRate+200,number_of_rooms:5,floor:500,smoking_rooms:0,bed:"1 King",premium_restaurant:true,microwave:true,stove:true,mini_fridge:true},
			Romance: {rate:baseRate+150,number_of_rooms:5,floor:400,smoking_rooms:0,bed:"1 Queen",premium_restaurant:true,microwave:true,stove:false,mini_fridge:true}, 
			Family: {rate:baseRate+100,number_of_rooms:10,floor:300,smoking_rooms:0,bed:"2 Double, 1 Single",premium_restaurant:false,microwave:true,stove:true,mini_fridge:true}, 
			Double: {rate:baseRate+50,number_of_rooms:10,floor:200,smoking_rooms:0,bed:"2 Double",premium_restaurant:false,microwave:true,stove:false,mini_fridge:true}, 
			Economy: {rate:baseRate-5,number_of_rooms:10,floor:100,smoking_rooms:5,bed:"1 Double",premium_restaurant:false,microwave:false,stove:false,mini_fridge:true}
    };

    let room_list = [];

    let info_title = $("<h1>").text("Your Room is Waiting...");		
    let bookNow = $("<h2>").text(`Book now for as low as $${baseRate}.00 per night!`);
    info_title.appendTo($("#JQ_target"));
    bookNow.appendTo($("#JQ_target"));

    let remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
	if(remote_array !== null){
        remote_status =true;
    }else{
        remote_status =false;
    }
    let ul_tag = $("<ul>");
    $.each( room_types, function( key, value ) {
		
        let li_tag = $("<li>");
        let inp1 = $("<label>").attr("for","type").text(`${key} - $${value.rate}.00 / Night`);
        let inp2 = $("<input>").attr({type:"radio", name:"type", class:"hotel_radios"}).val(key);
        inp1.appendTo(li_tag);
        inp2.appendTo(li_tag);
        li_tag.appendTo(ul_tag);
        ul_tag.appendTo($("#JQ_target"));

        if(remote_status === false){
            
        for(i=0;i<value.number_of_rooms;i++){
			room_list.push({
				room_number: value.floor+i,
                price: value.rate,
                type: key,
                booked: false,
                bed_type: value.bed,
                premium_access_restaurant: value.premium_restaurant,
                microwave: value.microwave,
                stove: value.stove,
                fridge: value.mini_fridge,
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
		}}        	
	});    
    if(remote_status === false){
        
        localStorage.setItem("Rooms_List", JSON.stringify(room_list));
        remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
    }
    render_rooms(remote_array);
}


//function to display rooms that are saved in local storage on the home page
function render_rooms(local){ 
          
	$.each(local, function( key, value ){  
				let list_item = $("<li>");
                //let link = $("<button>").addClass("rooms_button").text(local[i].room_number);
                let link = $("<div>").addClass("rooms_block").text(value.room_number);
                link.appendTo(list_item);
                  
                
                let availability;
                if(value.booked === false){
                    availability = "avail_rooms";
                }else{
                    availability = "booked_rooms";
                }

                if($(`#${availability}_${value.type}`).length>0){
                    list_item.appendTo($(`#${availability}_${value.type}`));
                }else{
					let list = $("<ul>").attr('id', `#${availability}_${value.type}`);
                    let room_type = $("<h2>").text(value.type);
                    list_item.appendTo(list);
                    room_type.appendTo($(`#${availability}`));
                    list.appendTo($(`#${availability}`));
                }   
	});  	   
}



// set the rooms as booked based on form assume this info is coming from the form inputs
function setRoom(){
    let remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
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
    //var remote_array = JSON.parse(localStorage.getItem("Rooms_List"));    
    
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
        remote_array = JSON.parse(localStorage.getItem("Rooms_List"));
        
        $("#avail_rooms").empty();
        $("#booked_rooms").empty();
        render_rooms(remote_array);
}

// Reference: https://www.w3schools.com/w3css/w3css_slideshow.asp
/*
let slideIndex = 0;
function carousel() {
  let x = document.querySelectorAll(".autoSlides");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) {
    slideIndex = 1
  }
  x[slideIndex - 1].style.display = "block";
  setTimeout(carousel, 3000);
}
carousel();*/