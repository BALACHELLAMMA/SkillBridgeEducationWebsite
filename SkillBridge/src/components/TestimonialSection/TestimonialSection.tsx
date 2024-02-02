import React, { useEffect, useReducer, useState } from "react";
import useToggleState from "../CommonFunctionalities/CustomHook/useToggleState";
import { Query } from "appwrite";
import { databases } from "../../appwriteConfig";

type ActionType =
  | { type: "SHOW_MORE_CONTENT"; id: number }
  | { type: "SHOW_LESS_CONTENT" }
  | { type: "TOGGLE_READ_ALL" };

// state type
interface State {
  showMoreContent: number | null;
  readMore: boolean;
}

const faqReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "SHOW_MORE_CONTENT":
      return { ...state, showMoreContent: action.id };
    case "SHOW_LESS_CONTENT":
      return { ...state, showMoreContent: null };
    case "TOGGLE_READ_ALL":
      return { ...state, readMore: !state.readMore };
    default:
      return state;
  }
};

const initialState: State = {
  showMoreContent: null,
  readMore: false,
};

function TestimonialSection(): JSX.Element {
  const [viewAll, setViewAll] = useToggleState(false);
  const [state, dispatch] = useReducer(faqReducer, initialState);

  const [testimonialDocuments, setTestimonialDocuments] = useState({
    documents: [],
  });

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const testimonialResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "TestimonialDataCollection",
          [Query.orderAsc("testimonialId")]
        );
        setTestimonialDocuments(testimonialResponse);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchTestimonialData();
  }, []);

  const TestimonialList = () => {
    const renderTestimonials = (startIndex: number, endIndex: number) => {
      const slicedTestimonials = testimonialDocuments.documents?.slice(startIndex, endIndex + 1);

      return slicedTestimonials?.map((testimonial) => (
        <div className="col-sm-6 mt-3 " key={testimonial?.testimonialId}>
          <div className="card border-0 rounded">
            <div className="comments card-header bg-white container">
              <p>{testimonial?.description}</p>
              {state.showMoreContent === testimonial?.testimonialId ? (
                <p className="">
                  And I want more courses from skillbridge.Thanks for reading...!
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="profile_container card-body d-flex justify-content-between flex-wrap gap-3">
              <div className="profile d-flex align-items-center gap-3">
                <img src={`../../src/assets/images/testimonialImages/${testimonial?.image}`} alt="testimonial" />
                <h5 className="card-title align-items-center">
                  {testimonial?.name}
                </h5>
              </div>
              <button
                className="btn btn-light fw-medium"
                onClick={() =>
                  state.showMoreContent === testimonial?.testimonialId
                    ? dispatch({ type: "SHOW_LESS_CONTENT" })
                    : dispatch({ type: "SHOW_MORE_CONTENT", id: testimonial?.testimonialId })
                }
              >
                {state.showMoreContent === testimonial?.testimonialId ? "Read less " : "Read Full Story"}
              </button>
            </div>
          </div>
        </div>
      )) || [];
    };

    return (
      <div className="d-flex flex-column gap-2">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {renderTestimonials(0, 3)}
          {viewAll && renderTestimonials(4, testimonialDocuments.documents.length - 1)}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="container mt-5 mb-5">
        <h1>Our Testimonials</h1>
        <section className="testimonial_description d-flex justify-content-between row mb-5">
          <p className="col-md-8">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            eget habitasse in velit fringilla feugiat senectus in.
          </p>
          <div className="col d-flex justify-content-md-end justify-content-sm-start mt-sm-2">
            <button
              className="bg-white border-0 rounded p-3"
              onClick={setViewAll}
            >
              {viewAll ? "View Less" : "View All"}
            </button>
          </div>
        </section>
        <div className="row">
          <TestimonialList />
        </div>
      </div>
    </React.Fragment>
  );
}

export default TestimonialSection;

