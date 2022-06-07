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


	function getRates(d){
		let checkinDATE = "2022-07-05";
		let checkoutDATE = "2022-07-15";
		compet = [];
		toot = {data:[]};
		for(i=0;i<d.length;i++){
			compet.push([d[i].shortName,d[i].address.address,d[i].address.city,d[i].address.country,d[i].hotelId]);
			toot.data.push({hotelId:d[i].hotelId,dates:[{checkIn:checkinDATE,checkOut:checkoutDATE},{checkIn:checkinDATE,checkOut:checkoutDATE}]});
		}
		sendTo = JSON.stringify(toot);
		alert(sendTo);

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
			.then(response => console.log(response))
			.catch(err => console.error(err));
		
	}



// "dates":[{"checkIn":"2022-07-01","checkOut":"2022-07-02"},{"checkIn":"2022-07-02","checkOut":"2022-07-03"}]
//	data: '{"data":[{"hotelId":"102061485","dates":{"checkIn":"2022-07-01","checkOut":"2022-07-02"}},]}'
//         {"data":[{"hotelId":"2628717","dates":{"checkIn":"2022-07-05","checkOut":"2022-07-15"}},
//};



/*
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
	.then(response => console.log(response))
	.catch(err => console.error(err));
*/



