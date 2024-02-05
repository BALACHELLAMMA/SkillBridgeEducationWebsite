import React, { useEffect, useState } from "react";
import useBooleanState from "../CommonFunctionalities/CustomHook/useToggleState";
import { Query } from "appwrite";
import { databases } from "../../appwriteConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import './BenefitList.scss';
interface BenefitListFieldType {
  id: number;
  benefitNumber: number;
  title: string;
  description: string;
}
function BenefitList() {
  const [viewAll, setViewAll] = useBooleanState(false);

  const [benefitDocuments, setBenefitDocuments] = useState<any>({
    documents: [],
  });

  useEffect(() => {
    const fetchBenefitData = async () => {
      try {
        const benefitsResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "BenefitDataCollection",
          [Query.orderAsc("id")]
        );
        if (benefitsResponse) {
          setBenefitDocuments(benefitsResponse);
        }
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchBenefitData();
  }, []);

  const BenefitSection = () => {
    const renderBenefits = (startIndex: number, endIndex: number) => {
      
      const slicedBenefits = benefitDocuments.documents?.slice(startIndex, endIndex + 1);
      
      if (!slicedBenefits) return null;

      return slicedBenefits?.map((benefit: BenefitListFieldType) => (
        <div className="col-md benefit_sub_container bg-white p-4 rounded ms-1" key={benefit?.id}>
          <div className="number_container d-flex justify-content-end"><h1>{benefit?.benefitNumber}</h1></div>
          <div className="benefit_text_container">
            <h4>{benefit?.title}</h4>
            <p>{benefit?.description}</p>
          </div>
          <div className="benefit_button_container d-flex justify-content-end">
            <button className="rounded border-0 bg-light text-warning p-3">
              <FontAwesomeIcon icon={faArrowRight} className="upright_arrow" />
            </button>
          </div>
        </div>
      )) || [];
    };

    return (
      <div className="d-flex flex-column gap-2">
        <div className="row gap-1">{renderBenefits(0, 2)}</div>
        <div className="row gap-1">{renderBenefits(3, 5)}</div>
        {viewAll ? (<div className="row gap-1">{renderBenefits(6, benefitDocuments.documents?.length - 1)}</div>): null}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5">
        <h1>Benefits</h1>
        <section className="benefits_description d-flex justify-content-between row mb-5">
          <p className="col-md-8">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            eget habitasse in velit fringilla feugiat senectus in.
          </p>
          <div className="col d-flex justify-content-md-end justify-content-sm-start mt-sm-2">
            <button className="bg-white border-0 rounded p-3" onClick={setViewAll}>
              {viewAll ? "View Less" : "View All"}
            </button>
          </div>
        </section>
        <BenefitSection />
      </div>
    </React.Fragment>
  );
}

export default BenefitList;
