  //! Just kept in case if required in future
  // const startDate = "2023-10-28";
  // const endDate = "2023-10-31";
  // function sortCompatibilityAsc() {
  //   setTemp(finalarray.sort(GetCompatibilitySort()));
  // }

  // function sortCompatibilityAscDup() {
  //   setTemp(finalArrayDup.sort(GetCompatibilitySort()));
  // }


  
  // function getCompatibilityArrayFinal() {
  //   let filteredArr = [];
  //   let len = finalarray.length;
  //   if (len) {
  //     filteredArr.push(finalarray[0]);
  //     let firstCompatibility = finalarray[0].ProductBrandOffering[0].CombinabilityCode[0];
  //     for (let i = 1; i < finalarray.length; i++) {
  //       if (firstCompatibility !== finalarray[i].ProductBrandOffering[0].CombinabilityCode[0]) {
  //         firstCompatibility = finalarray[i].ProductBrandOffering[0].CombinabilityCode[0];
  //         filteredArr.push(finalarray[i]);
  //       }
  //     }
  //   }
  //   setFinalArray(filteredArr);
  // }

  // function getCompatibilityArrayDup() {
  //   let filteredArr = [];
  //   let len = finalArrayDup.length;
  //   if (len) {
  //     filteredArr.push(finalArrayDup[0]);
  //     let firstCompatibility = finalArrayDup[0].ProductBrandOffering[0].CombinabilityCode[0];
  //     for (let i = 1; i < finalArrayDup.length; i++) {
  //       if (firstCompatibility !== finalArrayDup[i].ProductBrandOffering[0].CombinabilityCode[0]) {
  //         firstCompatibility = finalArrayDup[i].ProductBrandOffering[0].CombinabilityCode[0];
  //         filteredArr.push(finalArrayDup[i]);
  //       }
  //     }
  //   }
  //   setFinalArrayDup(filteredArr);
  // }


  
  // function GetCompatibilitySort() {
  //   return function (a, b) {
  //     let firstmini = a.ProductBrandOffering[0].CombinabilityCode[0];
  //     let secondmini = b.ProductBrandOffering[0].CombinabilityCode[0];

  //     if (firstmini > secondmini) {
  //       return 1;
  //     } else if (firstmini < secondmini) {
  //       return -1;
  //     } else {
  //       let first = a.ProductBrandOffering[0].Product.map((aa) => {
  //         return alldata.ReferenceList[1].Product.map((y) => {
  //           if (y.id === aa?.productRef) {
  //             return y.totalDuration;
  //           }
  //         });
  //       })
  //       let second = b.ProductBrandOffering[0].Product.map((aa) => {
  //         return alldata.ReferenceList[1].Product.map((y) => {
  //           if (y.id === aa?.productRef) {
  //             return y.totalDuration;
  //           }
  //         });
  //       })
  //       if (first < second) {
  //         return 1;
  //       } else {
  //         return -1;
  //       }
  //     }
  //   };
  // }
  
  // useEffect(()=>{
  //   if(finalarray.length!==0){
      // sortCompatibilityAsc();
      // sortCompatibilityAscDup();
      // getCompatibilityArrayFinal();
      // getCompatibilityArrayDup();
    // }
  // },[displayArray])



          
          {/* <div className='flex flex-col gap-[5px]'>
            {item.flightRefs.map((alp) => {
              return (
                <div className='flex gap-[5px]'>
                  {alldata.ReferenceList[0].Flight.map((y) => {
                    if (y.id === alp) {
                      return (
                        <>
                          <p>
                            <span className='font-bold'>
                              From -{" "}
                            </span>{" "}
                            {y.Departure.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              To -{" "}
                            </span>{" "}
                            {y.Arrival.location}
                          </p>
                          <p>
                            <span className='font-bold'>
                              Duration -{" "}
                            </span>{" "}
                            {y.duration}
                          </p>
                        </>
                      );
                    }
                  })}
                </div>
              );
            })}
          </div> */}
          
          {/* <div>
            <p>
              <span className='font-bold'>Departure Date - </span>
              {item.DepartureTime}
            </p>
            <p>
              <span className='font-bold'>Arrival Date - </span>
              {item.ArrivalTime}
            </p>
            {item.ProductBrandOffering.map((x) => {
              return (
                <div className='flex flex-col gap-[5px]'>
                  <div>
                    <span className='font-bold'>
                      Brand Name -{" "}
                    </span>
                    <span>
                      {alldata.ReferenceList[3].Brand.map((y) => {
                        if (y.id === x?.Brand?.BrandRef) {
                          // setBrandList(oldArray => [...oldArray, y.name])
                          return y.name;
                        }
                      })}
                    </span>
                    <p>
                      <span className='italic'>
                        Base Price -{" "}
                      </span>
                      {x.Price.Base}
                    </p>
                    <p>
                      <span className='italic'>
                        Total Taxes-{" "}
                      </span>
                      {x.Price.TotalTaxes}
                    </p>
                    <p>
                      <span className='italic'>
                        Total Price -{" "}
                      </span>
                      {x.Price.TotalPrice}
                    </p>
                  </div>
                  <div>
                    <span className='font-bold'>
                      Total Duration -{" "}
                    </span>
                    <span>
                      {x.Product.map((aa) => {
                        return alldata.ReferenceList[1].Product.map((y) => {
                          if (y.id === aa?.productRef) {
                            return y.totalDuration;
                          }
                        });
                      })}
                    </span>
                  </div>
                  <div>
                    <span className='font-bold'>
                      Validating Airlines -{" "}
                    </span>
                    <span>
                      {alldata.ReferenceList[2].TermsAndConditions.map(
                        (y) => {
                          if (
                            y.id ===
                            x.TermsAndConditions?.termsAndConditionsRef
                          ) {
                            return y.ValidatingAirline.map((air) => {
                              return air.ValidatingAirline;
                            });
                          }
                        }
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div> */}