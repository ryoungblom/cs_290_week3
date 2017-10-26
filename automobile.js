/*
Name:  Reuben Youngblom
Assignment: Higher Order Functions
Date: 10-22-17
Description:  Automobile Sorter with Higher Order Functions
*/


//note:  I left a lot of the notes given by the assignment in here, which I hope is ok.  I mostly did it to preserve the original notes, and they don't affect anything....

//given by assignment:

function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];



//example given by assignment
function forEach(array, work) {
  for (var i = 0; i < array.length; i++)
    work(array[i]);
}


/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/

//My sortArr function:

function sortArr( comparator, array ){
    
    for (var k=0; k < array.length-1; k++)  //this loops through enough times to use a bubble sort.
    { 
    
        for (var i=0; i < array.length-1; i++)
            {

                 var testBool = (comparator (array[i], array[i+1]));  //this will determine whether or not a switch is needed

                        if (testBool == true)  //if it comes back true...
                            {
                                 var tempArray = [];  //perform the switch.  This is a holder variable.
        
                                 tempArray[0] = array [i];
                                 array [i] = array [i+1];   //and these switch things out
                                array [i+1] = tempArray[0];
        
                            }

            }
    }
}


/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
//comparator example.  Left in, i guess I could have taken it out.
function exComparator( int1, int2){
    
    if (int1 > int2){
        return true;
    } else {
        return false;
    }
}



//my logMe function
function logMe (printBool)  {   //takes in a bool

    if (printBool == false)     //if it's false....
    {
        for (var n=0; n < automobiles.length; n++)  //iterates through the array as currently given
         { 
            //and accesses and prints year, make,model
             console.log (automobiles[n].year + " " + automobiles[n].make + " " + automobiles[n].model)
         }
    }
    
    else  //but if it's false....
    {
    for (var c=0; c < automobiles.length; c++)  //iterates through
         { 
            //and prints year, make, model, AND type
             console.log (automobiles[c].year + " " + automobiles[c].make + " " + automobiles[c].model + " " + automobiles[c].type)
         }
    } 
}


/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/

//year comparator
function yearComparator(auto1, auto2){  //takes in two objects

auto1.getYear = yearTest(auto1.year);  //and creates getYear property

var finalBoolYear = auto1.getYear (auto2.year);  //sets a bool to equal the nested functions

    function yearTest(auto1year) {  //first function, which returns a function
        return function(auto2year){  //the returned function takes in the second year

         if (auto1year < auto2year)  //this is the second function.  If they need to be switched...
         {
         yearBool = true;  //sets yearBool to true
         }
        else
         {
         yearBool = false;  //otherwise, it's false, and they're fine as is
         }
 
         return yearBool;  //and it returns yearBool all the way up, and whatever yearBool is, finalBoolYear is set to
        }
    }

return finalBoolYear;  //and this finally just returns a bool which tells the sortArr function whether or not to switch the array
}



/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/

//my Make comparator.  Works essentially the same as the year comparator, with the addition of a lowercase function call.
function makeComparator( auto1, auto2){
 
auto1.getMake = makeTest((auto1.make).toLowerCase());  //added a toLowerCase call, so it would be case insensitive

var finalBoolMake = auto1.getMake ((auto2.make).toLowerCase());  //same—added lower case call to auto #2

    function makeTest(auto1make) {  //and then basically just run it through the same system. Compare, and switch if needed.
        return function(auto2make){

         if (auto1make < auto2make)
         {
         makeBool = true;
         }
        else
         {
         makeBool = false;
         }
 
         return makeBool;
        }
    }

return finalBoolMake;  //and return the final boolean result, which will get sent back to sortArr function.
 
}


/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
//my Type comparator. This one was a little trickier as I had to assign each type a value.

function typeComparator( auto1, auto2){
auto1.getType = typeTest((auto1.type).toLowerCase());  //put this in lower case as well, especially to deal with things like SUV's which have multiple caps.

var finalBoolType = auto1.getType ((auto2.type).toLowerCase());  //same as above.  Lower case.

    function typeTest(auto1type) {
        return function(auto2type){  //called the nested functions as above, but:

         //order: roadster, pickup, suv, wagon, other  (note to self)
         
         //Here, I assigned each "type" a value to compare, because the order was arbitrary.
         //roadster was 5 (greatest), pickup was 4, etc.
         
         if(auto1type.toLowerCase() == "roadster")
         {
         auto1type = 5;
         }
 
         else if(auto1type.toLowerCase() == "pickup")
         {
         auto1type = 4;
         }
         
         else if(auto1type.toLowerCase() == "suv")
         {
         auto1type = 3;
         }
         
         else if(auto1type.toLowerCase() == "wagon")
         {
         auto1type = 2;
         }
         
         //And here, if it's none of the above, it's last.  One.
         else if(auto1type.toLowerCase() != "roadster" || "wagon" || "suv" || "pickup")
         {
         auto1type = 1;
         }
         
         
         //and then did it again for the second auto that got passed in
         if(auto2type.toLowerCase() == "roadster")
         {
         auto2type = 5;
         }
 
         else if(auto2type.toLowerCase() == "pickup")
         {
         auto2type = 4;
         }
         
        
         else if(auto2type.toLowerCase() == "suv")
         {
         auto2type = 3;
         }
         
         else if(auto2type.toLowerCase() == "wagon")
         {
         auto2type = 2;
         }
         
         else if(auto2type.toLowerCase() != "roadster" || "wagon" || "suv" || "pickup")
         {
         auto2type = 1;
         }
         
         
         //Here is the actual comparator.  By now, it's comparing integers instead of strings
         
         if (auto1type < auto2type)  //compared just like normal, but only if they're in the wrong order already and one is actually "greater".  Else...
         {
         typeBool = true;
         }
         
         //there was also some additional stuff here, as well.
         
         
         else if (auto1type == auto2type)  //if two were the same, it goes to a year test.
         
         //so I basically imported my Year Comparator here:
         
         {
         auto1.getYear = yearMakeTest(auto1.year);  //getYear

         var finalBoolMakeYear = auto1.getYear (auto2.year);  //assign function...

             function yearMakeTest(auto1year) {  //call first function
                return function(auto2year){  //return second function
        
                 if (auto1year < auto2year)  //in second function, make the comparison
                    {
                    yearMakeBool = true;  //return bool depending on which one is greater (year)
                    }
                 else
                     {
                    yearMakeBool = false;
                    }
 
            return yearMakeBool;  //and kick back a bool to evaluate, below
            }  
        }
  
         if (finalBoolMakeYear == true)  //if yearMakeBool comes back as True....
         {
         typeBool = true;  //they're in the wrong order and need to be swapped
         }
         
         else
         {
         typeBool = false;  //but if it's false, they're fine and can just stay as-is
         }   
    }

        else  //so, this else attaches to the above "else if" the two type are equal.
         {
         typeBool = false;  //if they don't need to be switched, and they're not equal, then return false and nothing happens.
         }
 
         return typeBool;  //and then this returns the final type bool to determine if the array elements need to be swapped.
        
    }
}
return finalBoolType;  //...and this is assigned to the return bool, which is what will ultimately get evaluated in sortArr
}


//this code below is what actually prints the desired info.
//prints all the required stuff, and then sends the proper comparator and array to the sort function
//and then the logMe function tells whether or not to print the type or not, and prints the rest

console.log(" ");
console.log("*****");
console.log("The cars sorted by year are:")
sortArr (yearComparator, automobiles);
logMe(false);
console.log(" ");


console.log(" ");
console.log("*****");
console.log("The cars sorted by make are:")
sortArr (makeComparator, automobiles);
logMe(false);
console.log(" ");


console.log(" ");
console.log("*****");
console.log("The cars sorted by type are:")
sortArr (typeComparator, automobiles);
logMe(true);
console.log(" ");


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */