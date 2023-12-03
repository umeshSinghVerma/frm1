function  FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, minPrice, maxPrice, setFinalArray, flight) {
    let filteredArr = [];
    displayArray.map((item) => {
      if (brand.length !== 0) {
        if (brand.includes(item.ProductBrandOffering[0].Brand?.BrandRef)) {
          if (flightNo.length > 0) {
            let x = item.flightRefs.length;
            if (x >= 3) {
              x = 3;
            }
            if (flightNo.includes(x)) {
              filteredArr.push(item);
            }
          } else {
            filteredArr.push(item);
          }
        }
      } 
      
      else if (brand.length === 0) {
        if (flightNo.length !== 0) {
          let x = item.flightRefs.length;
          if (x >= 3) {
            x = 3;
          }
          if (flightNo.includes(x)) {
            filteredArr.push(item);
          }
        } else {
          filteredArr = [...displayArray];
        }
      }
    });
    
    if (flight.length) {
      let newarr = [];
      filteredArr.filter((item) => {
        for (let i = 0; i < item.flightRefs.length; i++) {
          let carrier;
          for (let j = 0; j < alldata.ReferenceList[0].Flight.length; j++) {
            if (item.flightRefs[i] == alldata.ReferenceList[0].Flight[j].id) {
              carrier = alldata.ReferenceList[0].Flight[j].carrier;
            }
          }
          if (flight.includes(carrier)) {
            if (!newarr.includes(item)) {
              newarr.push(item);
            }
          }
        }
      });
      filteredArr = [...newarr];
    }
    
    if (minPrice.current.value != "" && maxPrice.current.value != "") {
      let newarr = [];
      filteredArr.map((item) => {
        let alpha = item.ProductBrandOffering.filter(
          (y) =>
            y.BestCombinablePrice.TotalPrice >= minPrice.current.value &&
            y.BestCombinablePrice.TotalPrice <= maxPrice.current.value
        );
        let beta = JSON.stringify(item);
        beta = JSON.parse(beta);
        beta.ProductBrandOffering = alpha;
        if (alpha.length !== 0) {
          newarr.push(beta);
        }
      });
      filteredArr = [...newarr];
    }

    setFinalArray(filteredArr);
}

export default FinalOfferingsUpdater;