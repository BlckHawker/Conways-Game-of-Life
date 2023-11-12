const lifeworld = {
    init(numCols, numRows) {
        this.numCols = numCols,
        this.numRows = numRows,
        this.world = this.buildArray();
        this.worldBuffer = this.buildArray();
        this.randomSetup();
    },

    buildArray() {
        let outerArray = [];
        for(let row = 0; row < this.numRows; row++) {
            let innerArray = [];
            for(let col = 0; col < this.numCols; col++) {
                innerArray.push(0);
            }

            outerArray.push(innerArray);
        }

        return outerArray;
    },

    randomSetup() {
        for(let row = 0; row < this.numRows; row++) {
            for(let col = 0; col < this.numCols; col++) {
                this.world[row][col] = 0;
                if(Math.random() < .1) {
                    this.world[row][col] = 1;
                }
            }
        }
    },

    getLivingNeighbors(row,col){

		// count up how many neighbors are alive at N,NE,E,SE,S,SW,W,SE

        let num = 0;

        for(let rowOffset = -1; rowOffset < 2; rowOffset++) {
            for(let colOffset = -1; colOffset < 2; colOffset++) {
                
                let newRow = rowOffset + row;
                let newCol = colOffset + col;

                if((rowOffset === 0 && colOffset === 0) || newRow < 0 || newCol < 0 || newRow > this.numRows - 1 || newCol > this.numCols - 1) {
                    continue;
                }

                if(this.world[newRow][newCol] === 1) {
                    num++;
                }
            }
        }
		
		// return that sum
        return num;
    },

    step(){
        //TODO

        // nested for loop will call getLivingNeighbors() on each cell in this.world
        for(let row = 0; row < this.numRows; row++) {
            for(let col = 0; col < this.numCols; col++) {

                let neighborNum = this.getLivingNeighbors(row, col);

                // Determine if that cell in the next generation should be alive

                // Put a 1 or zero into the right location in this.worldBuffer
                
                //If square is black:
                if(this.world[row][col] === 0) {
                    
                    //turn white if there are 3 alive neighbors

                    this.worldBuffer[row][col] = neighborNum === 3 ? 1 : 0;
                }

                //If square is white:
                else {
                    
                    //turn black when neighbouring squares < 2 or > 3
                    
                    this.worldBuffer[row][col] = neighborNum < 2 || neighborNum > 3 ? 0 : 1;
                }

            }

        }
	    
	    
	    // when the looping is done, swap .world and .worldBuffer
        let tempworld = this.world.slice();
        this.world = this.worldBuffer.slice();
        this.worldBuffer = tempworld.slice();
    },
}

