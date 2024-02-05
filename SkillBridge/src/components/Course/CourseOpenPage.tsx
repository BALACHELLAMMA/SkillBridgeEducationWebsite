import { useEffect, useState } from "react";
import "./Course.scss";

import { useLocation } from 'react-router-dom';
import { databases } from "../../appwriteConfig";
import { Query } from "appwrite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";


interface CourseSyllabusDocumentFieldType{
  id:number;
  firstLesson:string;
  secondLesson:string;
  thirdLesson:string;
  firstLessonDuration:string;
  secondLessonDuration:string;
  thirdLessonDuration:string;
}

function CourseOpenPage() {
  const [descriptionDocument, setDescriptionDocument] = useState<any>({});
  const [courseSyllabusDocuments, setCourseSyllabusDocuments] = useState<any>({
    documents: [],
  });
  useEffect(() => {
    const fetchCourseData = async () => {
      try {

        const descriptionResponse = await databases.getDocument(
          "65a0d58f05d18f1fd844",
          "DescriptionDataCollection",
          "5"
        );

        const courseSyllabusResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "individualCourseSyllabusCollection",
          [Query.orderAsc("id")]
        );
        if(courseSyllabusResponse){
          setCourseSyllabusDocuments(courseSyllabusResponse);
        }

        if(descriptionResponse){
          setDescriptionDocument(descriptionResponse);
        }

      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchCourseData();
  }, []);

  const location = useLocation();
  const courseDetails = location.state;
  return (
    <div>
      {(descriptionDocument && courseDetails[0] === 'UI/UX Design') ? (
        <section className="description_section container mt-5 mb-5 border-bottom">
          <div className="description_container row ">
            <h1 className="col-md-6 col-12">{descriptionDocument?.heading}</h1>
            <p className="col-md-6 col-12 border">{descriptionDocument?.content}</p>
          </div>
        </section>
      ) : (
        <section className="description_section container mt-5 mb-5 border-bottom">
          <div className="description_container row ">
            <h1 className="col-md-6 col-12">{courseDetails[0]}</h1>
            <p className="col-md-6 col-12">Welcome to {courseDetails[0]} course</p>
          </div>
        </section>
      )}

      <div className="courseImageContainer container">

        <img src={`${courseDetails[2]}`} className="courseImage img-fluid" alt="Course" />
      </div>

      <div className="container mt-5 mb-5">
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {courseSyllabusDocuments?.documents.map((course:CourseSyllabusDocumentFieldType) => {
            return (
              <div className="col ">
                <div className="card border-0 bg-white p-3 d-flex gap-2">
                  <h1 className="fw-bold align-self-end">0{course?.id}</h1>
                  <h5>{courseDetails[3][course?.id - 1]}</h5>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="lesson_text fw-medium">
                        {course?.firstLesson}
                      </p>
                      <p className="text-secondary">Lesson 01</p>
                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2 ">
                      <FontAwesomeIcon icon={faClock} className="clock_icon"/>
                      <p className="duration_text ">{course?.firstLessonDuration}</p>
                    </div>
                  </div>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="lesson_text fw-medium ">
                        {course?.secondLesson}
                      </p>
                      <p className="text-secondary">Lesson 02</p>

                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2">
                      <FontAwesomeIcon icon={faClock} className="" />
                      <p className="duration_text">{course?.secondLessonDuration}</p>
                    </div>
                  </div>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="lesson_text fw-medium">
                        {course?.thirdLesson}
                      </p>
                      <p className="text-secondary">Lesson 03</p>
                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2 "
                    >
                      <FontAwesomeIcon icon={faClock} className="" />
                      <p className="duration_text">{course?.thirdLessonDuration}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseOpenPage;

