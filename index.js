const fs = require('fs');
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    
    
    findDistanceBetweenStops = (busNumber, startingBusStopCode, endingBusStopCode, direction) => {
        let rawdata = fs.readFileSync('database/routes.json');
        let routes = JSON.parse(rawdata);
    
        const findDistance = (busNumber, busStop, direction) => {
            for(i=0; i <routes.length; i++) {
                if(busNumber == routes[i].ServiceNo && busStop == routes[i].BusStopCode && direction == routes[i].Direction) {
                    return routes[i].Distance; 
                }
            }
        }
    
        let DistanceBusStop1 = findDistance(busNumber, startingBusStopCode, direction);
        let DistanceBusStop2 = findDistance(busNumber, endingBusStopCode, direction);
    
        return  DistanceBusStop2 - DistanceBusStop1;
    
    }
    
    
    var finalDistance = findDistanceBetweenStops(req.query.busNumber, req.query.startingBusStopCode, req.query.endingBusStopCode, req.query.direction); 
    
    
    res.send(`The distance between the stops is ${finalDistance}`); 
})

app.listen(port, () => console.log(`Bus Routes is running on ${port}!`))



