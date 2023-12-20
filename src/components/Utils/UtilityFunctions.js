import { clearBrands } from "../../redux/brand";
import { clearflights } from "../../redux/flight";
import { clearflightNos } from "../../redux/flightNo";
import { updateMaxPrice, updateMinPrice } from "../../redux/priceFilter";
import { replacefinalArray } from "../../redux/finalArray";

// Returns a comparator function for sorting items based on their total price

function GetPriceSort() {
  return function (a, b) {
    let firstmini = a.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;
    let secondmini = b.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;

    if (firstmini > secondmini) {
      return 1;
    } else if (firstmini < secondmini) {
      return -1;
    }
    return 0;
  };
}


// Function: GetTimeSort
// Returns a comparator function for sorting items based on their departure time
function GetTimeSort() {
  return function (a, b) {
    if (a.DepartureTime > b.DepartureTime) {
      return 1;
    } else if (a.DepartureTime < b.DepartureTime) {
      return -1;
    }
    return 0;
  };
}

function clearfn(dispatch,displayArray,maximumPrice) {
  dispatch(replacefinalArray(displayArray));
  dispatch(clearBrands())
  dispatch(clearflightNos())
  dispatch(clearflights())
  dispatch(updateMinPrice(''))
  dispatch(updateMaxPrice(maximumPrice))
}

export {GetPriceSort, GetTimeSort,clearfn};