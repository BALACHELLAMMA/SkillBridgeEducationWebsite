import { useEffect, useReducer, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { databases } from "../../appwriteConfig";
import { Query } from "appwrite";

type ActionType =
  | { type: "SHOW_MORE_CONTENT"; id: number }
  | { type: "SHOW_LESS_CONTENT" }
  | { type: "TOGGLE_READ_ALL" };

//state type
interface State {
  showMoreContent: number | null;
  readMore: boolean;
}

const initialState: State = {
  showMoreContent: null,
  readMore: false,
};

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

const TestimonialSliderComponent = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [state, dispatch] = useReducer(faqReducer, initialState);

  const [testimonialDocuments, setTestimonialDocuments] = useState<object>({
    documents: [],
  });

  useEffect(() => {
    const fetchTestimonialData = async () => {
      try {
        const response = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "TestimonialDataCollection",
          [Query.orderAsc("testimonialId")]
        );
        setTestimonialDocuments(response);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchTestimonialData();
  }, []);

  const renderTestimonial = testimonialDocuments.documents.map(
    (testimonial:any, index:number) => (
      <section className="comments_container bg-white rounded" key={index}>
        <p className="p-4">
          {testimonial?.description}
          {state.showMoreContent === testimonial?.testimonialId ? (
            <p className="p-4">
              And I want more courses from skillbridge.Thanks for reading...!
            </p>
          ) : (
            ""
          )}
        </p>
        <div
          className="profile_container border-top p-4
              d-flex justify-content-between flex-wrap"
        >
          <div className="profile  d-flex gap-3 align-items-center">
            <img
              src={`../../src/assets/images/testimonialImages/${testimonial?.image}`}
              alt="avatar"
            />
            <p className="mt-3">{testimonial?.name}</p>
          </div>
          <button
            className="btn btn-light fw-medium"
            onClick={() =>
              state.showMoreContent === testimonial?.testimonialId
                ? dispatch({ type: "SHOW_LESS_CONTENT" })
                : dispatch({
                    type: "SHOW_MORE_CONTENT",
                    id: testimonial?.testimonialId,
                  })
            }
          >
            {state.showMoreContent === testimonial?.testimonialId
              ? "Read less "
              : "Read Full Story"}
          </button>
        </div>
      </section>
    )
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const goToNextSlide = () => {
    slider.slickNext();
  };

  const goToPrevSlide = () => {
    slider.slickPrev();
  };

  return (
    <>
      <Slider ref={(slider: Slider) => setSlider(slider)} {...settings}>
        {renderTestimonial}
      </Slider>

      <div className="button_container align-self-md-end align-self-center mt-3">
        <button
          className="bg-white rounded border-0 p-3"
          onClick={goToPrevSlide}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="left_arrow" />
        </button>
        <button
          className="bg-white rounded border-0 p-3 ms-2"
          onClick={goToNextSlide}
        >
          <FontAwesomeIcon icon={faArrowRight} className="rightarrow" />
        </button>
      </div>
    </>
  );
};

export default TestimonialSliderComponent;
