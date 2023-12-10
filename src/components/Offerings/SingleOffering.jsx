import React from 'react'

const SingleOffering = ({returnBack, departureFrom, arrivalTo, item, alldata}) => {
    return (
      <>
        <div className='flex sm:items-center gap-x-8 gap-y-1 sm:gap-10 flex-wrap sm:flex-nowrap xl:gap-24 m-2'>
          <div>
            {/* dept-arrival timings */}
            <div>

            </div>

            {/* dept-arrival places */}
            <div>
              {!returnBack && <h2>{departureFrom} to {arrivalTo}</h2>}
              {returnBack && <h2>{arrivalTo} to {departureFrom}</h2>}
            </div>
          </div>
          <div><span className='font-bold'>No. of stops -</span> {item.flightRefs.length}</div>
          <div>
            {item.ProductBrandOffering.map((x) => {
              return (
                <div className='flex flex-col gap-[5px]'>
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
                </div>
              );
            })}
          </div>         
        </div>
      </>
      );
}

export default SingleOffering
