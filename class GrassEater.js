class GrassEater extends LivingCreature {

    constructor(x, y, index){   
    super(x, y, index);
    this.energy = 8;   
    }  
    getNewCoordinates() {   
    this.directions = [    
    [this.x - 1, this.y - 1],   
    [this.x, this.y - 1],   
    [this.x + 1, this.y - 1],   
    [this.x - 1, this.y],   
    [this.x + 1, this.y],   
    [this.x - 1, this.y + 1],  
    [this.x, this.y + 1],   
    [this.x + 1, this.y + 1]   
    ];   
    }   
    chooseCell(char) {   
      this.getNewCoordinates();    
      return super.chooseCell(char);   
    }  
    
 

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell && this.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;

            var newGr = new GrassEater(newX, newY);
            grassEaterArr.push(newGr);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            if(this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(4);
        var newCell1 = random(emptyCells1);
        if(newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else if(newCell1) {
            var newX = newCell1[0];
            var newY = newCell1[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in bactArr) {
                if (newX == bactArr[i].x && newY == bactArr[i].y) {
                    bactArr.splice(i, 1);
                    break;
                }
            }
            this.die()
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}