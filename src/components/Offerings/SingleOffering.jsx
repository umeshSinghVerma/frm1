import React from 'react'

const SingleOffering = ({returnBack, from, arrival, item, alldata}) => {
    return (
      <>
        <div className='flex items-center gap-24 m-2'>
          <div>
            {/* dept-arrival timings */}
            <div>

            </div>

            {/* dept-arrival places */}
            <div>
              {!returnBack && <h2>{from} to {arrival}</h2>}
              {returnBack && <h2>{arrival} to {from}</h2>}
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
