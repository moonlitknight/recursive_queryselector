// app calls import {recursiveQuerySelectorAll} from 'recursive_queryselector'

// q = a valid querySelector, eg #myid
export const recursiveQuerySelectorAll = (q) => {
  // define the inner function that is recursed for each element
  let doEach = (root, indent) => {
    indent+=' ';
    for (let e of root.children) {
      if (!e.shadowRoot) {  // not WebComponents are simply recursed
        doEach(e, indent);
        continue;
      }
      console.log(`${indent}${e.nodeName} #${e.id}`); // log each WebComponent intended
      eArray.push(e.shadowRoot);      // and store the shadowRoot for subsequent scanning
      doEach(e.shadowRoot, indent);
    }
  }

  let eArray = [];  // array to hold the WebComponent elements
  eArray.push(document);
  console.log('document');  // start the console logs with the top level document
  doEach(document, ' ');  // run the recursion

  let resArray = []; // the result array which will hold the queried elements
  for (let e of eArray) {
    //console.log(e);
    resArray = resArray.concat(...e.querySelectorAll(q));  // run the query on each shadowRoot and accumulate into the resArray
  }
  //console.log(resArray);
  return resArray;
}

