DROP TABLE if exists cities_weather; 
CREATE TABLE cities_weather (id INT NOT NULL AUTO_INCREMENT, 
city_name VARCHAR(30) not null, 
latitude DECIMAL(11, 8) not null,
longitude DECIMAL (11, 8) not null,
weather_type VARCHAR(20) not null,
current_temp_celsius INT not null, 
max_temp_celsius INT not null, 
min_temp_celsius INT not null,
snow_mm INT not null,
PRIMARY KEY (id)); 

