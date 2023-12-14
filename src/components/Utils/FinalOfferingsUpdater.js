// Function: FinalOfferingsUpdater
// Parameters:
// - displayArray: Array of items to be filtered based on various criteria
// - brand: Array of selected brand IDs for filtering
// - flightNo: Array of selected flight numbers for filtering
// - alldata: Object containing reference data, including flight information
// - minPrice: Reference to the minimum price input field
// - maxPrice: Reference to the maximum price input field
// - setFinalArray: Function to update the state with the filtered array
// - flight: Array of selected flight carriers for filtering

import { replacefinalArray } from "../../redux/finalArray";

function  FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, dispatch, flight,minPrice,maxPrice) {
  // Initialize an array to store the filtered items
    let filteredArr = [];

    // Iterate over each item in the displayArray
    displayArray.map((item) => {
      // Check if brand filter is applied
      if (brand.length !== 0) {
        // Check if the item's brand is included in the selected brand IDs
        if (brand.includes(item.ProductBrandOffering[0].Brand?.BrandRef)) {
          // Check if flight number filter is applied
          if (flightNo.length > 0) {
            // Determine the effective flight count (limited to 3)
            let x = item.flightRefs.length;
            if (x >= 3) {
              x = 3;
            }

            // Check if the effective flight count is included in the selected flight numbers
            if (flightNo.includes(x)) {
              // Add the item to the filtered array
              filteredArr.push(item);
            }
          } else {
            // If no flight number filter, add the item to the filtered array
            filteredArr.push(item);
          }
        }
      } 

      // If brand filter is not applied
      else if (brand.length === 0) {
        // Check if flight number filter is applied
        if (flightNo.length !== 0) {
          // Determine the effective flight count (limited to 3)
          let x = item.flightRefs.length;
          if (x >= 3) {
            x = 3;
          }

          // Check if the effective flight count is included in the selected flight numbers
          if (flightNo.includes(x)) {
            // Add the item to the filtered array
            filteredArr.push(item);
          }
        } else {
          // If no brand or flight number filter, copy the entire display array
          filteredArr = [...displayArray];
        }
      }
    });
    

    // Check if flight carrier filter is applied  
    if (flight.length) {
       // Initialize a new array to store items that match the selected flight carriers
      let newarr = [];

      // Iterate over each item in the filtered array
      filteredArr.filter((item) => {
        // Iterate over each flight reference in the item
        for (let i = 0; i < item.flightRefs.length; i++) {
          let carrier;

          // Find the carrier associated with the current flight reference in the reference data
          for (let j = 0; j < alldata.ReferenceList[0].Flight.length; j++) {
            if (item.flightRefs[i] == alldata.ReferenceList[0].Flight[j].id) {
              carrier = alldata.ReferenceList[0].Flight[j].carrier;
            }
          }

          // Check if the carrier is included in the selected flight carriers
          if (flight.includes(carrier)) {
             // Add the item to the new array if not already included
            if (!newarr.includes(item)) {
              newarr.push(item);
            }
          }
        }
      });
      // Update the filtered array with items matching the selected flight carriers
      filteredArr = [...newarr];
    }
    

    minPrice= Number(minPrice) 
    maxPrice= Number(maxPrice) 
    // Check if both minPrice and maxPrice filters are applied
    if (minPrice != "" && maxPrice != "") {

      // Initialize a new array to store items with prices within the specified range
      let newarr = [];
      // Iterate over each item in the filtered array
      filteredArr.map((item) => {
         // Filter the ProductBrandOffering array based on the price range
        let alpha = item.ProductBrandOffering.filter(
          (y) => {
            return (

              y.BestCombinablePrice.TotalPrice >= Number(minPrice) &&
              y.BestCombinablePrice.TotalPrice <= Number(maxPrice)
            )
          }
        );

        // Create a deep copy of the item
        let beta = JSON.stringify(item);
        beta = JSON.parse(beta);

        // Update the ProductBrandOffering property with the filtered array
        beta.ProductBrandOffering = alpha;

        // If the filtered array is not empty, add the item to the new array
        if (alpha.length !== 0) {
          newarr.push(beta);
        }
      });

      // Update the filtered array with items within the specified price range
      filteredArr = [...newarr];
    }

    // Update the state with the final filtered array
    dispatch(replacefinalArray(filteredArr));
}

export default FinalOfferingsUpdater;