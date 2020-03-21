module.exports = function check(str, bracketsConfig) {

  // helper arr that is used in str checking loop
  let helperArr = []

  //helper function that replaces characters at specific index
  String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

  //an objects of brackets that that have different opening and closing eg. [] {} ()
  let differentBracketsMap = {}
  let closingBrackets = {}

  // an array of brackets that have the same opening and closing eg. || or 88
  let sameBracketsMap = []

  // loop that sorts the brackets types
  for (let i=0; i<bracketsConfig.length; i++){
    if(bracketsConfig[i][0] != bracketsConfig[i][1]){
      differentBracketsMap[bracketsConfig[i][0]] = bracketsConfig[i][1]
      closingBrackets[bracketsConfig[i][1]] = true
    }else {
      sameBracketsMap.push(bracketsConfig[i][0])
    }
  } 

  //if we have a case in which there are some brackets with the same opening and closing, this block of code will check if those are correct
  if (sameBracketsMap){
    //loop that iterates through samebracketsmap
    for (let i=0; i< sameBracketsMap.length; i++){
      // loop that iterates through str
      for (let n=0; n< str.length; n++){
        //finding same bracket str character
        if (str[n]==sameBracketsMap[i]){
          // now there are two posibilities if we found one:
          // 1. that the bracket is closed immediatelly after it was open eg. ||
          // 2. if not closed immediatelly, it should be closed in next third, fifth, seventh etc. character eg. |()| of |(())|, if that doestn happen, the parenthesis is broken so the loop should leave unchanged brackets in the str
          // checking first posibility
          if (str[n] === str[n+1]){
            //lets replace those stupid brackets 
            str= str.replaceAt(n,"<")
            str= str.replaceAt(n+1,">")
          }
          // checking second posibility
          else{
            for (let m=n+3; m<=str.length; m+=2){
              if (str[n] === str[m]){
                str = str.replaceAt(n,"<")
                str = str.replaceAt(m,">")
              }
            }
          }
        }
      }
    }

    // loop that checks if all same bracket pairs were replaced, if not, the parenthesis is broken
    //first lets iterate through samebracketsmap
    for (let i=0; i<sameBracketsMap.length;i++){
      //then lets chceck if the bracket was replaced. If not, the parenthesis is broken
      if (str.indexOf(sameBracketsMap[i])>=0) {
        return false
      }
    }
  }
  //now if all sae bracket pairs were resolved, let's resolve the rest of brackets
  
  //str checking loop

  for (let i=0; i< str.length; i++){
    let char = str[i]
    if (differentBracketsMap[char]) {
      helperArr.push(char)
    }else if (closingBrackets[char]) {
      if (differentBracketsMap[helperArr.pop()] !== char) return false
    }
  }
  return helperArr.length === 0
}
