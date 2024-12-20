const units = {
  gal: "L",
  L: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs"
};

const unitExtended = {
  gal: "gallons",
  L: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

function splString(input) {
    
   const lastNumberIndex = input.search(/\d(?!.*\d)/); 
   if (lastNumberIndex === -1) { 
   
     return { numbers: '1', characters: input }; } 
     
     const numbersPart = input.slice(0, lastNumberIndex + 1); 
     const charactersPart = input.slice(lastNumberIndex + 1); 
     return { numbers: numbersPart, characters: charactersPart }; }




  function ConvertHandler() {
  
  this.getNum = function(input) {

    const num = splString(input)?.numbers


     if (/^(\d+(\.\d+)?(\/\d+(\.\d+)?)?)$/.test(num)) {
      if (num?.includes('/')) {
       const inx= num?.indexOf('/');
       const numerator = parseFloat(num.slice(0, inx)); 
       const denominator = parseFloat(num.slice(inx + 1)); 
       return denominator !==0 ? numerator / denominator : 'invalid number'
      
       
      }
      else {
        
        return  parseFloat(num) 
      }
    
     }
    
    else {return 'invalid number'}
    
    
  };
  
  this.getUnit = function(input) {

    const unit = splString(input).characters
    
    if (unit) {
      return this.spellOutUnit(unit)
    }
    
    
    return 'invalid unit'
  };
  
  this.getReturnUnit = function(initUnit) {
    
    
    return units[initUnit];
  };

  this.spellOutUnit = function(unit) {
    let lowUnit = unit.toLowerCase()
    if (lowUnit==='l') {
      return 'L'
    }
    else {
      return Object.keys(units).includes(lowUnit) ? lowUnit : 'invalid unit'
    }
    
    
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return (initNum * galToL).toFixed(5);
      case "L":
        return (initNum / galToL).toFixed(5);
      case "lbs":
        return (initNum * lbsToKg).toFixed(5);
      case "kg":
        return (initNum / lbsToKg).toFixed(5);
      case "mi":
        return (initNum * miToKm).toFixed(5);
      case "km":
        return (initNum / miToKm).toFixed(5);
      default:
        return undefined    }
    
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    
    return `${initNum} ${unitExtended[initUnit]} converts to ${returnNum} ${unitExtended[returnUnit]}`;
  };
  
}


module.exports = ConvertHandler;
