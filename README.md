# Astrosearch

## Description
Astrosearch makes use of several APIs to offer users the opportunity to gain up-to-date astronomical information and images. NASA's Picture of the Day will automatically upload once a date is selected and the phases of the moon and sun and moon rise and set times can also be seen.

## Link to Deployed Application
[AstroSearch](https://karen-o94.github.io/UoB_BC_AstronomicalEventSearch/)

## Screenshots
![1](https://user-images.githubusercontent.com/74797740/107119804-d8111480-6881-11eb-9fd2-54fcf7d44eb4.jpg)
![2](https://user-images.githubusercontent.com/74797740/107119828-f5de7980-6881-11eb-94f6-9e9c07926b64.jpg)
![3](https://user-images.githubusercontent.com/74797740/107119840-042c9580-6882-11eb-8ed7-e110e3053a41.jpg)
![4](https://user-images.githubusercontent.com/74797740/107119849-13abde80-6882-11eb-9110-a5674e097371.jpg)


## Usage ##
The app offers clear uses to those with an interest in astronomy, as it can provide a convenient way for amateur astronomers to put several sets of data in one place, such as NASA's Picture of the Day, alongside sunset and sunrise times, which are essential for taking part in astronomy.


It also has educational uses, allowing educators to illustrate changing sunset and sunrise times throughout the year, as well as the changing phases of the moon.

**Built With**
- HTML
- [Materialize CSS Framework](https://materializecss.com/)
- CSS
- JavaScript / [jQuery](https://jquery.com/) / AJAX
- [VScode](https://code.visualstudio.com/)

**List of APIs Used**
1. [NASA APOD API](https://api.nasa.gov/) – This allowed us to take the date inputted by the user and search for the image.

2. [OpenWeather GeoCoding API](https://openweathermap.org/api/geocoding-api) – We were able to get the longitude and latitude co-ordinates of the inputted location, which will then be run through the below to retrieve the desired information.

3. [Astronomy API](https://astronomyapi.com/) – Using the same co-ordinates we earlier retrieved, we are able to information on the sun rise, sun set, moon rise and moon set. (The feature for this API will deprecate after 60 days – 02/04/2021)

4. [IPGeolocation Astronomy API](https://ipgeolocation.io/) – Using the above longitude and latitude co-ordinates, this API returned data regarding selected events.

5. [iCalendar Moon](http://www.wdisseny.com/lluna/?lang=en) -  This API displayed the moon-phase for the current day.

## Future Development
We would like to deveop the local storage functionality further, including storing more data and retrieving it more effectively.


The Astronomy API provided a free API key for a trial period, which will expire in 60 days, at which time, this feature will be deprecated., so future development may mean finding an alternative source for this data. While loading today's picture is smooth, loading other sates can be slower, so we would work on that.


Other areas for improvement might include broadening the types of data presented in the app, to include, for example, visibility of the planets, lunar and solar eclipses, space exploration events, such as major launches.

## Challenges and Learning Points
One thing that was a challenge but worked well was coordinating teamwork. Using GitHub to coordinate was a steep learning curve, with moments of frustration and even exasperation for most of the team. However, using Kanban and coordinating tasks assigned and completed made our workflow much easier.


Conversely, we could have made better use of our branches, which we confused somewhat, not always using the Pull Request and Git Push system as effectively as we could. Ultimately, the team worked well together, supporting one another in achieving their goals and keeping a clear vision of what the app should look like. 


Getting some of the APIs to work was a challenge, as was including the moonphase API and the svg it returns which was challenging to manipulate. 


We expected `localStorage` to be much more easy to achieve, as we had done something similar in a previous assignment. However, performing the same task in this app proved much more challenging, due to the format of the date-picker worked and the  values returned by it. 


We used Materialize as our CSS Framework for this project. Whether we would again or not was also discussed; it seemed rather limited by comparison to Bootstrap, in terms of colours, button forms, etc.


## Authors
1. [George Cope](https://github.com/MyDryDay)
2. [Karen Opoku](https://github.com/Karen-O94)
3. [Olivia Owen](https://github.com/oliviaowen1)
4. [Drew Bassett](https://github.com/drewbassett24)
