import { useEffect, useState } from "react";
import FAQSection from "../../components/CommonFunctionalities/FAQSection/FAQSection";
import PricingSection from "../../components/CommonFunctionalities/PricingSection/PricingSection";
import { databases } from "../../appwriteConfig";

function PricingPage() {
  const [descriptionDocument, setDescriptionDocument] = useState<object>({});

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const descriptionResponse = await databases.getDocument(
          "65a0d58f05d18f1fd844",
          "DescriptionDataCollection",
          "1"
        );
        setDescriptionDocument(descriptionResponse);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchPricingData();
  }, []);

  console.log(descriptionDocument)
  return (
    <div>
       {descriptionDocument && (
           <section className="description_section container mt-5 mb-5 border-bottom">
           <div className="description_container row ">
             <h1 className="col-md-6 col-12">{descriptionDocument?.heading}</h1>
             <p className="col-md-6 col-12">{descriptionDocument?.content}</p>
           </div>
         </section>
       )}
       <PricingSection/>
       <FAQSection/>
    </div>
  );
}

export default PricingPage;
