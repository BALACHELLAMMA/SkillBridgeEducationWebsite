import React, { useEffect, useState } from "react";
import "./PricingSection.scss";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { databases } from "../../../appwriteConfig";

function PricingSection() {
  const [monthlyYearly, setMonthlyYearly] = useState("monthly");
  const location = useLocation();
  const currentPathname = location.pathname;

  const [pricingPlanDocuments, setPricingPlanDocuments] = useState<object>({
    documents: [],
  });

  useEffect(() => {
    const fetchPricingData = async () => {
      const pricingPlanResponse = await databases.listDocuments(
        "65a0d58f05d18f1fd844",
        "pricingPlanDataCollection"
      );
      setPricingPlanDocuments(pricingPlanResponse);
    };
    fetchPricingData();
  }, []);

  console.log(pricingPlanDocuments);

  const renderPricingData = (data) => {
    if (!data) {
      return null;
    }

    const filteredPlans = data.documents?.filter(
      (plan) => plan?.category === monthlyYearly
    );
    console.log(filteredPlans);

    return filteredPlans?.map((plan) => (
      <div className="col">
        <div className="card border-0 p-2 bg-light">
          <div className="card-body d-flex flex-column">
            <div className="plan_container bg-light rounded">
              <h3 className="plan_type p-3 rounded text-center">
                {plan?.planType}
              </h3>
              <div className="text-center p-4">
                <h2>
                  <span className="price fw-bold">${plan?.price}</span>/
                  {monthlyYearly === "monthly" ? "month" : "year"}
                </h2>
              </div>
              <div className="available_features_container bg-white border p-3 d-flex flex-column gap-2">
                <h3 className="text-center fw-medium">Available Features</h3>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="available_icon text-black p-3 rounded"
                  />
                  <p className="mt-2">{plan?.feature1}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="available_icon text-black p-3 rounded"
                  />

                  <p className="mt-2">{plan?.feature2}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="available_icon text-black p-3 rounded"
                  />

                  <p className="mt-2">{plan?.feature3}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="available_icon text-black p-3 rounded"
                  />

                  <p className="mt-2">{plan?.feature4}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="available_icon text-black p-3 rounded"
                  />

                  <p className="mt-2">{plan?.feature5}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faClose}
                    className="unavailable_icon text-black p-3 rounded border"
                  />

                  <p className="mt-2">{plan?.feature6}</p>
                </div>
                <div className="d-flex gap-3 border rounded align-content-center p-2">
                  <FontAwesomeIcon
                    icon={faClose}
                    className="unavailable_icon text-black p-3 rounded border"
                  />

                  <p className="mt-2">{plan?.feature7}</p>
                </div>
              </div>
              <button className="get_started_button border-0 w-100 fw-bold text-white">
                Get it Started
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5">
        <section
          className={`pricing_description mb-5 ${
            currentPathname === "/pricing"
              ? "d-flex justify-content-center"
              : "d-flex align-items-center justify-content-between"
          }`}
        >
          <div
            className={`pricing_description_content w-75 ${
              currentPathname === "/pricing" ? "d-none" : "d-block"
            }`}
          >
            <h1>Our Pricing</h1>
            <p className="">
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </p>
          </div>
          <div className="monthly_yearly_button bg-white rounded d-flex gap-1  mt-sm-2 p-2">
            <button
              className={`monthly_Link border-0 ${
                monthlyYearly === "monthly" ? "active" : ""
              }`}
              onClick={() => setMonthlyYearly("monthly")}
            >
              <b>Monthly</b>
            </button>
            <button
              className={`yearly_Link border-0 ${
                monthlyYearly === "yearly" ? "active" : ""
              }`}
              onClick={() => setMonthlyYearly("yearly")}
            >
              <b>Yearly</b>
            </button>
          </div>
        </section>
        <div className={`pricing_section row row-cols-1 ${monthlyYearly === 'monthly'?'row-cols-md-2':'row-cols-md-1'} g-4 bg-white rounded p-4`}>
          {renderPricingData(pricingPlanDocuments)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default PricingSection;
