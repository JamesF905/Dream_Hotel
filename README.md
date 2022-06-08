# Online Hotel Booking System
# by_Rakibul, James, and Sampat

<div id="top"></div>

[![LinkedIn][linkedin-shield]][linkedin-url]



<br />
<div align="center">
  <a href="https://github.com/JamesF905/Dream_Hotel">
    <img src="assets/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Online Hotel Booking System</h3>

  <p align="center">
    <a href="https://jamesf905.github.io/Dream_Hotel"><strong>https://jamesf905.github.io/Dream_Hotel</strong></a>
    <br />
    <br />
    <a href="https://www.linkedin.com/in/james-fidlin-98853a239/">linkedin</a>
    ·
    <a href="www.gmail.com">Contact</a>
  </p>
</div>

## About The Project

[![Online Hotel Booking System][product-screenshot]](https://jamesf905.github.io/Dream_Hotel)

Note: Though slow the API do eventually load on the booking section, this version hasnt been optimized for speed yet

For this project, Rakibul, Sampat, and I aimed to build an online hotel booking system, complete with reservations, points of interest, and price comparrisons. Though we fell short, or slightly late, we gained valuable experience working as a team, delegating tasks, and using github to full effect. We discovered valuable resources such as Rapid Api, and learned many new challenging ways to use third party API's. 

We took on a very large project, much larger than we anticipated, but we are all proud of the way we pressed on, often into the early morning hours, just to start over the next morning after a quick rest. If we could do it all over again, the main thing we would change would be to first identify which API's we needed, build them seperately, then build the site around them. Building sperate sections of the site together, rather than building focusing of different areas like html, css, and jquery individually.

A BREAKDOWN OF HOW WE IMPLEMENTED RAPIDAPI to generate dynamic price ranges

1) Gather a list of ten hotels local to Cancun
2) Then takes those hotels and gets prices based on the checkin and check out dates and the hotal id from the first API call.
3) This returns a new array with hotelid, checkin, checkout, and rates.
4) From there the hotel id's are compaired between the two objects, and where they match $.extend was used to build a final object of hotels with all their info, as well as prices from multiple sources based on the check/checkout times.
5) The lowest value of these prices are taken for each hotel, then again, the lowest prices of all hotels to finally reach a lowest base rate.
6) This base rate is then used to adjust the pricing for our lowest room, so that it will always be 5 dollars cheaper per night than all other competitors. The prices of higher teir rooms are raised by 50 dollars each from this base rate.
7) If the api fails to load, then our hotel base rate ($300) is used instead

CURRENT ISSUES
1) Loads slow
2) Page needs to load independant of price gathering through the AIP, then updated after.

We also used Tom Tom to generate points of interest based on the location of our hotel in downtown Cancun

Below is the original user story and site plan we wrote at the beginning of the project.
-----------------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------------

# Dream Hotel - #
# Located in Cancun Mexico with Lon and lat co-ordinates#

An online hotel room booking system for a made up Hotel, that will book rooms, make reservations for restaurant. Bookings for a spa, exercise rooms, yoga center.

AS A hotel manager
I WANT to build an online booking system that will allow guests to book rooms, and other services via the website
SO THAT I can automate our booking system

WHEN the guest visits the site
THEN they are asked when they will be staying and for how long (select a date range)
WHEN they select their date range they are asked what type of room they would like, occupants, what services they want included in their stay(pool, spa, etc)(list all prices)

THEN they are asked what services they want included in their stay(pool, spa, restaunt bookings etc)(list the prices of each service in the form)
WHEN they have completed the form  
THEN they are shown their bill with total ammount of their stay quoted, shown their check in and check out times(11am, 4pm), cancellation policy, the room becomes booked

IF they select a restaurant booking  
THEN they are given a list of restaurts on the resort to book from
WHEN they select a restaurant
THEN they given a form with date and time, type of meal, number of people, room number

WHEN they checkout 
THEN their bill is shown, with any extra fees included, the room would then become available

MVP - they can book a room, book a restaurant stay, and when they checkout the room becomes available

Potential API'S

jquery
moment
font awesome
google maps
whether 


Tasks Breakdown
 
Rakibul will work on the wireframe and implementing some styles using a css framework (not bootstrap)
Sampat - html layout, finishing setting up the github repo
James - Jquery finishing the github settings, for the projects section



<p align="right">(<a href="#top">back to top</a>)</p>


### Built With

* [Javascript](https://www.javascript.com/)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Git Hub](https://github.com/)
* [Git Bash](https://git-scm.com/)
* [Bootstrap](https://getbootstrap.com/docs/3.3/)
* [JQuery](https://git-scm.com/)
* [Momentjs](https://momentjs.com/)
* [Font Awesome](https://fontawesome.com/icons)

<p align="right">(<a href="#top">back to top</a>)</p>


## Contact

James Fidlin - gmail.com

Project Link: [https://github.com/JamesF905/Dream_Hotel](https://github.com/JamesF905/Dream_Hotel)

<p align="right">(<a href="#top">back to top</a>)</p>



[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/james-fidlin-98853a239/
[product-screenshot]: assets/images/Project_Screenshot.png



