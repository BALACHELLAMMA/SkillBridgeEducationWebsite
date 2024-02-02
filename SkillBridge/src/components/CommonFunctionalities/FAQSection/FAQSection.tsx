import React, { useEffect, useReducer, useState } from 'react';
import './FAQSection.scss';
import { databases } from '../../../appwriteConfig';
import { Query } from 'appwrite';
import { faArrowRight, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ActionType =
  | { type: 'SHOW_ANSWER'; id: number }
  | { type: 'HIDE_ANSWER' }
  | { type: 'TOGGLE_VIEW_ALL' }
  | { type: 'TOGGLE_ANSWER'; id: number };

// state type
interface State {
  showAnswer: number | null;
  viewAll: boolean;
}

const faqReducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case 'SHOW_ANSWER':
      return { ...state, showAnswer: action.id };
    case 'HIDE_ANSWER':
      return { ...state, showAnswer: null };
    case 'TOGGLE_VIEW_ALL':
      return { ...state, viewAll: !state.viewAll };
    case 'TOGGLE_ANSWER':
      return {
        ...state,
        showAnswer: state.showAnswer === action.id ? null : action.id,
      };
    default:
      return state;
  }
};

const initialState: State = {
  showAnswer: null,
  viewAll: false,
};

function FAQSection() {
  const [state, dispatch] = useReducer(faqReducer, initialState);
  const [faqDocuments, setfaqDocuments] = useState({
    documents: [],
  });

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const faqResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "FaqDataCollection",
          [Query.orderAsc("id")]
        );
        setfaqDocuments(faqResponse);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchFaqData();
  }, []);

  const renderFAQs = (startIndex: number, endIndex: number) => {
    const slicedFAQs = faqDocuments.documents?.slice(startIndex, endIndex + 1);

    return slicedFAQs?.map((faq) => (
      <div className='FAQ_container card p-1 border' key={faq?.id}>
        <div className="d-flex flex-column  gap-4 rounded align-content-center p-3">
          <div className="d-flex justify-content-between  rounded align-content-center p-2 ">
            <p className="mt-2 fw-medium">{faq?.question}</p>
            <button
              className='open_close_button bg-transparent border-0 '
              onClick={() => dispatch({ type: 'TOGGLE_ANSWER', id: faq?.id })}
            >
              <FontAwesomeIcon
                icon={state.showAnswer === faq?.id ? faXmark : faPlus}
                className='close_open_icon text-black p-2 rounded'
              />
            </button>
          </div>
          {state.showAnswer === faq?.id ? (
            <div className="answer_container border-top py-3">
              <p className="fw-medium px-2">{faq?.answer}</p>
              <div className="bg-light d-flex justify-content-between border rounded align-content-center p-2 ">
                <p className="mt-3 fw-medium">Enrollment Process for Different Courses</p>
                <button className="faq_forward_button btn btn-circle">
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="rightarrow bg-white border p-2 rounded-circle"
                  />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    )) || [];
  };

  return (
    <React.Fragment>
      <section className="faq_section container mt-5 mb-3 bg-white rounded">
        <div className="row row-cols-1 row-cols-md-2 g-4 d-flex justify-content-between p-3">
          <div className="col-md-5">
            <div className="card border-0 p-2">
              <div className="card-body">
                <h1>Frequently Asked Questions</h1>
                <p>Still you have any questions? Contact our Team via support@skillbridge.com</p>
                <button
                  className="see_all_faq_button btn fw-bold bg-light border p-2 "
                  onClick={() => dispatch({ type: 'TOGGLE_VIEW_ALL' })}
                >
                  {state.viewAll ? 'See Less' : 'See All FAQ’s'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-7 d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-2">
              {renderFAQs(0, 4)}
              {state.viewAll && renderFAQs(5, faqDocuments.documents.length - 1)}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default FAQSection;

