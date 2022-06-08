//$(".room_links").click(selectSuite);
$("#book_now").click(setRoom);
//Get the array of hotels near cancun

let remote_status;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
		'X-RapidAPI-Key': 'dff196c561msh0c8ace6cb8d11dep1ebe39jsn419e5cef5f41'
	}
};

fetch('https://hotel-price-aggregator.p.rapidapi.com/search?q=cancun', options)
	.then(response => response.json())
	.then(function (data) {
        getRates(data);
       //console.log(data);
    })
	.catch(err => console.error(err));

//Send the Hotels array to the fetch and get rates for each
function getRates(d){
	let checkinDATE = "2022-06-7";
	let checkoutDATE = "2022-06-8";
	compet = [];
	toot = {data:[]};
	for(i=0;i<d.length;i++){
		compet.push({name:d[i].shortName, address:d[i].address.address,city:d[i].address.city,country:d[i].address.country,hotelId:d[i].hotelId});
		toot.data.push({hotelId:d[i].hotelId,dates:[{checkIn:checkinDATE,checkOut:checkoutDATE},{checkIn:checkinDATE,checkOut:checkoutDATE}]});
	}
	sendTo = JSON.stringify(toot);
	

	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Host': 'hotel-price-aggregator.p.rapidapi.com',
			'X-RapidAPI-Key': 'dff196c561msh0c8ace6cb8d11dep1ebe39jsn419e5cef5f41'
		},
		body: sendTo
};
		
fetch('https://hotel-price-aggregator.p.rapidapi.com/batchRates', options)
	.then(response => response.json())
	.then(data => compile(compet,data))
	.catch(err => console.error(err));		
}

// combine the hotels array with the prices array by checking to see if the hotel i'd match, then using $.extend to combine them into a complete hotels array with prices included	
function compile(ar1, ar2){
	for(i=0; i<ar1.length; i++){
		for (key of ar2) {		
			if(key.hotelId === ar1[i].hotelId){
				
				//get the sources for the rates, turn into a smaller array
				let rateSources = key.dates[0].rates.map(function(value) {
					return {source: value.host, rate: value.rate};
				});
		
				//get the lowest rate for each hotal
				let rates_array = key.dates[0].rates.map(function(value) {
					return value.rate;
				});

				let minimum = Math.min.apply(Math, rates_array);

				//make the new object to combine with the object in ar1[i]
				let obj= {Check_In: key.dates[0].checkIn, Check_Out: key.dates[0].checkOut, Rate_Sources: rateSources, Lowest_Rate: minimum};
				
				$.extend(ar1[i], obj);
				break;			
			}
		}	
	}
	
	
	
	
	
	
	
	
	
	let lowest_HOTEL_rates_ARRAY = ar1.map(function(value) {
		return value.Lowest_Rate;
	});

	let default_baseRate = 300;
	let adjusted_baseRate = Math.min.apply(Math, lowest_HOTEL_rates_ARRAY);
	
	//check if the api returned values
	if(adjusted_baseRate !== null){
		
        default_rooms_array(adjusted_baseRate, true);
        
	}else{
        
		default_rooms_array(default_baseRate, false);
        
	}

}

//make room type array([ price/night, # of rooms, floor number, #of smoking rooms, Bed types, premium restaurant access, microwave, stove, mini-fridge])
//add smoking and bed types to the array

function default_rooms_array(baseRate, success){
    
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

carousel();