import React from 'react'

const Display = ({item,alldata}) => {
    return (
        <div
          style={{
            display: "flex",
            gap: "5px",
            flexDirection: "column-reverse",
            border: "2px black solid",
            margin: "5px",
            padding: "5px",
          }}
        >
          <div>
            <p>
              <span style={{ fontWeight: "bold " }}>Departure Date - </span>
              {item.DepartureTime}
            </p>
            <p>
              <span style={{ fontWeight: "bold " }}>Arrival Date - </span>
              {item.ArrivalTime}
            </p>
            {item.ProductBrandOffering.map((x) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold " }}>
                      Brand Name -{" "}
                    </span>
                    <span>
                      {alldata.ReferenceList[3].Brand.map((y) => {
                        if (y.id == x?.Brand?.BrandRef) {
                          return y.name;
                        }
                      })}
                    </span>
                    <p>
                      <span style={{ fontStyle: "italic" }}>
                        Base Price -{" "}
                      </span>
                      {x.Price.Base}
                    </p>
                    <p>
                      <span style={{ fontStyle: "italic" }}>
                        Total Taxes-{" "}
                      </span>
                      {x.Price.TotalTaxes}
                    </p>
                    <p>
                      <span style={{ fontStyle: "italic" }}>
                        Total Price -{" "}
                      </span>
                      {x.Price.TotalPrice}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold " }}>
                      Total Duration -{" "}
                    </span>
                    <span>
                      {x.Product.map((aa) => {
                        return alldata.ReferenceList[1].Product.map((y) => {
                          if (y.id == aa?.productRef) {
                            return y.totalDuration;
                          }
                        });
                      })}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontWeight: "bold " }}>
                      Validating Airlines -{" "}
                    </span>
                    <span>
                      {alldata.ReferenceList[2].TermsAndConditions.map(
                        (y) => {
                          if (
                            y.id ==
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

          <div
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            {item.flightRefs.map((alp) => {
              return (
                <div style={{ display: "flex", gap: "5px" }}>
                  {alldata.ReferenceList[0].Flight.map((y) => {
                    if (y.id == alp) {
                      return (
                        <>
                          <p>
                            <span style={{ fontWeight: "bold " }}>
                              From -{" "}
                            </span>{" "}
                            {y.Departure.location}
                          </p>
                          <p>
                            <span style={{ fontWeight: "bold " }}>
                              To -{" "}
                            </span>{" "}
                            {y.Arrival.location}
                          </p>
                          <p>
                            <span style={{ fontWeight: "bold " }}>
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
      );
}

export default Display
