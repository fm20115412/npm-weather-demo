/**
 * Created by fm on 2017/2/24.
 */
var apiName="http://api.jirengu.com/weather.php";
var http=require("http");
http.get(apiName, (res) => {
    const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error(`Request Failed.\n` +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
            `Expected application/json but received ${contentType}`);
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData);
            var weatherInfo=parsedData["results"][0];
            // console.log(weatherInfo);
            var weatherData=weatherInfo["weather_data"][0];
            // console.log(weatherData);
             var weatherAdvice=weatherInfo["index"][0];
            // console.log(weatherAdvice);
            console.log("您所在的城市：",weatherInfo["currentCity"]);
            console.log("天气：",weatherData["weather"]);
            console.log("风向：",weatherData["wind"]);
            console.log("气温：",weatherData["temperature"]);
            console.log("穿衣建议：",weatherAdvice["des"]);

        } catch (e) {
            console.log(e.message);
        }
    });
}).on('error', (e) => {
    console.log("Got error: ${e.message}");
});