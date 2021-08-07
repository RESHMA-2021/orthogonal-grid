const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const randomize = document.querySelector('.randomize');
const shade = document.querySelector('canvas');
const ctx = shade.getContext('2d');
let stopper = 0;
const resolution = 20;
shade.width = 800;
shade.height = 600;
const COLS = shade.width / resolution;
const ROWS = shade.height / resolution;

function buildGrid() {
    return new Array(COLS).fill(null)
    .map(()=> new Array(ROWS).fill(null)
    .map(()=> Math.floor(Math.random()*2)));
}

let grid = buildGrid();


function update(){
  if(stopper === 0){
    grid= befStep(grid);
    render(grid);
    requestAnimationFrame(update);
  }
} 

// in that step to show that next step how to perform
function befStep(grid){
   const befStep = grid.map( arr => [...arr]);
   
   for(let col = 0; col < grid.length; col++){
    for(let row = 0; row < grid[col].length; row++){
        const cell= grid[col][row];
        let byStander = 0;
        for(let i= -1; i < 2 ; i++){
            for(let j= -1 ; j < 2 ; j++){
               if(i === 0 && j===0){
                   continue; 
               }
               const x_cell = col+i;
               const y_cell = row+j;
               if(x_cell >=0 && y_cell >0 &&  x_cell<COLS && y_cell < ROWS){
                  let resentDoor = grid[col+i][row+j];
                  byStander += resentDoor;
             

               }
            }
            
        }


        // steps of next genrations how to follow
        if(cell === 1 && byStander < 2){
          befStep[col][row] = 0;  
        }else if(cell === 1 && byStander > 3){
          befStep[col][row] = 0;
        }else if(cell === 0 && byStander === 3){
          befStep[col][row] = 1;
        }


    }
  }
  return befStep;

}



function render(grid) {
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
            const cell= grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution , row * resolution, resolution , resolution );
            ctx.fillStyle = cell ? 'black' :'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}



// event listeners

// start 

start.addEventListener('click'  , () => {
  stopper =0;
  requestAnimationFrame(update);
})

// randomize
randomize.addEventListener('click' , () => {
   stopper = 1;
   grid = buildGrid();
   render(grid);
})


// stop 

stop.addEventListener( 'click' , () => {
  stopper = 1;
})