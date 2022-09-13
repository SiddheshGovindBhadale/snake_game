// Game constant
let inputDir = {x:0 , y:0}
let board = document.getElementById("board")
let snakeArr = [{x:5 , y:10}]
let food = {x : 4 , y : 8}
let speed = 7
let lastPaintTime = 0
let score = 0



// Game functions
function main(currentTime){
   window.requestAnimationFrame(main)
   if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
   }
   lastPaintTime = currentTime
   gameEngine()
}


function isCollapse(arr){
    // if snake bit tail
    for(let i = 1; i< arr.length; i++){
        if(arr[i].x === arr[0].x && arr[i].y === arr[0].y){
           return true;
        }
    }
    
    // if snake touch wall of board
    if(arr[0].x <0 || arr[0].x > 18 || arr[0].y > 18 || arr[0].y < 0){
        return true;
    }
    
    return false;
}



function gameEngine(){
   // update snake array
   if(isCollapse(snakeArr)){
      score = snakeArr.length - 1
      alert("Game Over" + "Score :" + score)
      snakeArr = [{x:5 , y:10}]
      inputDir = {x:0 , y:0}
   }
  
   
   // if eat food then update snakeArr and create new food
   if(snakeArr[0].x === food.x && snakeArr[0].y === food.y){
      snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
      let a = 2;
      let b = 16;
      food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
      
   }
   
   
  
   // Moving the snake
   for (let i = snakeArr.length - 2; i>=0; i--) { 
       snakeArr[i+1] = {...snakeArr[i]};
   }
   
   snakeArr[0].x += inputDir.x;
   snakeArr[0].y += inputDir.y;
   
   
   // add snake and food inside board
   board.innerHTML = ""
   
   // display snake in board
   snakeArr.forEach((item , index)=>{
       snakeElement = document.createElement("div")
       snakeElement.style.gridRowStart = item.y
       snakeElement.style.gridColumnStart = item.x
       if(index === 0){
          snakeElement.classList.add("head")
       }
       else{
          snakeElement.classList.add("tail")
       }
       board.appendChild(snakeElement)
   })
   
   // display food in board
   foodElement = document.createElement("div")
   foodElement.style.gridRowStart = food.y
   foodElement.style.gridColumnStart = food.x
   foodElement.classList.add("food")
   board.appendChild(foodElement)
}


// Game control function
/*window.addEventListener("click" , () => {
     inputDir = {x:0 , y:1}
})*/
     function up(){
         inputDir.x = 0
         inputDir.y = -1
     }

     function down(){
         inputDir.x = 0
         inputDir.y = 1
     }

     function left(){
         inputDir.x = -1
         inputDir.y = 0
     }

     function right(){
         inputDir.x = 1
         inputDir.y = 0
     }




// Game main logic
window.requestAnimationFrame(main)

window.addEventListener("keydown" , e => {
  switch(e.Key){
      case "ArrowUp":
           up()
           break;
       
      case "ArrowDown":
           down()
           break;
      
      case "ArrowLeft":
           left()
           break;
      
      case "ArrowRight":
           right()
           break;
           
      default:
           break;
  }
  
})