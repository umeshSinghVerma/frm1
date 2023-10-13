import React from 'react'

const Display = ({item,alldata}) => {
    return (
      <>
        <div className='flex gap-[5px] flex-col-reverse border-2 border-black m-[5px] p-[5px]'>
          <div>
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
          </div>

          <div className='flex flex-col gap-[5px]'>
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
          </div>
          <div>No. of stops - {item.flightRefs.length}</div>
        </div>
      </>
      );
}

export default Display
