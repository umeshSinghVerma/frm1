import React from 'react'
import SingleOffering from './SingleOffering';
import FlightDetails from './FlightDetails';

const AllOffering = ({ finalarray, showDetails, openAccordian, departureFrom, arrivalTo, alldata, finalArrayDup, sortTimeAsc }) => {
  return (
    <div className="flex flex-col gap-4 my-10">
      {finalarray.map((item, id) => {
        let conditionMet = false;
        let conditionMet1 = false;
        return (
          <main key={id}>
            <section className="shadow-md  bg-white border border-white rounded-xl hover:border-slate-500 transition-all cursor-pointer">
              {/* Closed Accordian */}
              <div className={`flex ${showDetails === id ? "border-b border-slate-400" : ""}`} >
                <div className="flex flex-col p-5 justify-center" onClick={() => openAccordian(id)} >
                  {/* Destination Flight */}
                  <div className="flex gap-2">
                    <input type="checkbox" />
                    <SingleOffering returnBack={false} departureFrom={departureFrom} arrivalTo={arrivalTo} item={item} alldata={alldata} />
                  </div>

                  {/* Return Flight */}
                  <div className="flex gap-2">
                    <input type="checkbox" />
                    <div>
                      {finalArrayDup.map((dup, id) => {
                        if (!conditionMet &&
                          dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                          item.ProductBrandOffering[0].CombinabilityCode[0]
                        ) {
                          conditionMet = true;

                          return (
                            <SingleOffering key={id} returnBack={true} departureFrom={departureFrom} arrivalTo={arrivalTo} item={dup} alldata={alldata} />
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-300 w-[1px] "></div>

                {/* Total Price */}
                <div className="p-5">
                  Total Price :-{" "}
                  <p className="font-bold text-3xl">
                    ${" "} {item.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}
                  </p>
                  <button
                    onClick={() => sortTimeAsc()}
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
                  return (
                    showDetails === id && (
                      <FlightDetails key={ind} item={item} dup={dup} alldata={alldata}
                      />
                    )
                  );
                }
              })}
            </section>
          </main>
        );
      })}
    </div>
  )
}

export default AllOffering
