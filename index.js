import Jimp from 'jimp';
import {httpServer} from './src/http_server/index.js';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 5000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port : 8080 });


wss.on('connection', ws => {
    console.log('connection accepted');
    ws.on('message', data => {
        console.log(data.toString());
        const command = data.toString().split(' ');
        let { x, y} = robot.getMousePos();

        switch(command[0]){
            case 'mouse_up' : 
                robot.moveMouse(x, y - +command[1]);
                break;
            case 'mouse_down' : 
                robot.moveMouse(x, y + +command[1]);
                break;
            case 'mouse_left' : 
                robot.moveMouse(x - +command[1], y);
                break;
            case 'mouse_right' : 
                robot.moveMouse(x + +command[1], y);
                break;
            case 'draw_circle':
                draw_circle(+command[1]);
                break;
            case 'draw_square':
                draw_square(+command[1]);
                break;
            case 'draw_rectangle':
                draw_rectangle(+command[1], +command[2]);
                break;

        }
    })
})

function draw_circle(radius){
    let { x, y } = robot.getMousePos();
    const startX = x;
    const startY = y;

    let stepX = 0.01;
    let currentX = -radius;
    let currentY = 0;

    robot.setMouseDelay(0.2);
    

    robot.moveMouse(startX, startY);
    robot.mouseToggle("down");

    while (currentX < radius) {
        
        currentY = Math.sqrt(radius*radius - currentX*currentX);
        currentX += stepX;
        robot.moveMouse(startX + radius + currentX, startY - currentY);
    }

    currentX = radius;
    currentY = 0;

    while (currentX > -radius) {
        currentY = Math.sqrt(radius*radius - currentX*currentX);
        currentX -= stepX;
        robot.moveMouse(startX + radius + currentX, startY + currentY);
    }

    robot.mouseToggle("up");
}

function draw_square(width){
    let { x, y } = robot.getMousePos();
    const startX = x;
    const startY = y;

    let step = 0.01;
    let currentX = 0;
    let currentY = 0;

    robot.setMouseDelay(0.2);
    

    robot.moveMouse(startX, startY);
    robot.mouseToggle("down");

    while (currentX < width) {
        currentX += step;
        robot.moveMouse(startX + currentX, startY);
    }


    while (currentY < width) {
        currentY += step;
        robot.moveMouse(startX + width, startY + currentY);
    }

    currentX = 0;
    while (currentX < width) {
        currentX += step;
        robot.moveMouse(startX + width - currentX, startY + width);
    }

    currentY = 0;

    while (currentY < width) {
        currentY += step;
        robot.moveMouse(startX, startY + width - currentY);
    }

    robot.mouseToggle("up");
}

function draw_rectangle(width, height){
    let { x, y } = robot.getMousePos();
    const startX = x;
    const startY = y;

    let step = 0.01;
    let currentX = 0;
    let currentY = 0;

    robot.setMouseDelay(0.2);
    

    robot.moveMouse(startX, startY);
    robot.mouseToggle("down");

    while (currentX < width) {
        currentX += step;
        robot.moveMouse(startX + currentX, startY);
    }


    while (currentY < height) {
        currentY += step;
        robot.moveMouse(startX + width, startY + currentY);
    }

    currentX = 0;
    while (currentX < width) {
        currentX += step;
        robot.moveMouse(startX + width - currentX, startY + height);
    }

    currentY = 0;

    while (currentY < height) {
        currentY += step;
        robot.moveMouse(startX, startY + height - currentY);
    }

    robot.mouseToggle("up");
}