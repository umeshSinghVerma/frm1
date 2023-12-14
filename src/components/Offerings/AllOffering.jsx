import React from 'react'
import X from "../../data1.json";
import SingleOffering from './SingleOffering';
import FlightDetails from './FlightDetails';
import { useSelector } from 'react-redux';

const AllOffering = ({  showDetails, openAccordian}) => {
  const departureFrom =X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
  const arrivalTo =X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
  const alldata = X.CatalogProductOfferingsResponse;
  const finalArrayDup = useSelector((state) => state.finalArrayDup.finalArrayDup);
  const finalarray = useSelector((state) => state.finalArray.finalArray);
  return (
    <div className="flex flex-col gap-4 my-10">
      {finalarray.map((item, id) => {
        let conditionMet = false;
        let conditionMet1 = false;
        let returnDetails;
        return (
          <main key={id}>
            <section className="shadow-md mx-5 xl:mx-0 bg-white border border-white rounded-xl hover:border-slate-500 transition-all cursor-pointer">
              {/* Closed Accordian */}
              <div className={`flex flex-col sm:flex-row justify-around ${showDetails === id ? "border-b border-slate-400" : ""}`} >
                <div className="flex flex-col p-5 justify-center" onClick={() => openAccordian(id)} >
                  {/* Destination Flight */}
                  <div className="flex gap-2">
                    <input type="checkbox" />
                    <SingleOffering returnBack={false} departureFrom={departureFrom} arrivalTo={arrivalTo} item={item} alldata={alldata} />
                  </div>

                  {/* Return Flight */}
                  <div className="flex gap-2">
                    <div>
                      {finalArrayDup.map((dup, id) => {
                        if (!conditionMet &&
                          dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                          item.ProductBrandOffering[0].CombinabilityCode[0]
                        ) {
                          conditionMet = true;

                          return (
                            <div key={id} className='flex gap-2'>
                              <input type="checkbox" />
                              <SingleOffering returnBack={true} departureFrom={departureFrom} arrivalTo={arrivalTo} item={dup} alldata={alldata} />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block bg-slate-300 w-[1px] "></div>

                {/* Total Price */}
                <div className="p-5">
                  Total Price :-{" "}
                  <p className="font-bold text-3xl">
                    ${" "} {item.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}
                  </p>
                  <button
                    // onClick={() => sortTimeAsc()}
                    className="text-white w-full mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
                    style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)", }}
                  >
                    Select
                  </button>
                </div>
              </div>

              {/* Details Inside Accordian */}
              {finalArrayDup.map((dup, ind) => {
                if (!conditionMet1 &&
                  dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                  item.ProductBrandOffering[0].CombinabilityCode[0]
                ) {
                  conditionMet1 = true;
                  returnDetails = dup;
                }
              })}

              { showDetails === id && (
              <FlightDetails item={item} dup={returnDetails} alldata={alldata}
              />)}
            </section>
          </main>
        );
      })}
    </div>
  )
}

export default AllOffering
