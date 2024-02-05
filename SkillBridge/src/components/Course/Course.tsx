import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../../appwriteConfig";
interface CourseDocumentFieldType {
  id: number;
  title: string;
  content: string;
  difficultyLevel: string;
  instructor: string;
  duration: string;
  firstTopic: string;
  secondTopic: string;
  thirdTopic: string;
  fourthTopic: string;
  fifthTopic: string;
  firstImage: string;
  secondImage: string;
  thirdImage: string;
  fourthImage: string;
  fifthImage: string;

}
const Course = () => {
  const [courseContentDocuments, setCourseContentDocuments] = useState<any>({
    documents: [],
  });
  const [descriptionDocument, setDescriptionDocument] = useState<any>({});


  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseContentResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "CourseContentDataCollection",
          [Query.orderAsc("id")]
        );

        const descriptionResponse = await databases.getDocument(
          "65a0d58f05d18f1fd844",
          "DescriptionDataCollection",
          "4"
        );

        if (courseContentResponse) {
          setCourseContentDocuments(courseContentResponse);
        }

        if (descriptionResponse) {
          setDescriptionDocument(descriptionResponse);
        }
        
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchCourseData();
  }, []);
  const navigate = useNavigate();

  const handleOpenCourse = (
    title: string,
    courseContent: string,
    courseImage: string,
    courseTopics: object
  ) => {
    console.log("called", courseImage);

    navigate("/course/courseOpenPage", {
      state: [title, courseContent, courseImage, courseTopics],
    });
  };



  const renderCourseList = courseContentDocuments.documents?.map((course: CourseDocumentFieldType) => {
    return (
      <section
        className="course_section container bg-white  p-3 mt-3 mb-3 rounded d-flex flex-column
      gap-4"
        key={course?.id}
      >
        <h1>{course?.title}</h1>
        <section className="course_description d-flex justify-content-between row mb-2">
          <p className="col-md-8">{course?.content}</p>
          <div className="col d-flex justify-content-md-end justify-content-sm-start mt-sm-2">
            <button
              className="bg-light border-0 rounded p-3"
              onClick={() =>
                handleOpenCourse(
                  course?.title,
                  course?.content,
                  `../../src/assets/images/courseImages/${course.firstImage}`,
                  [
                    course?.firstTopic,
                    course?.secondTopic,
                    course?.thirdTopic,
                    course?.fourthTopic,
                    course?.fifthTopic,
                  ]
                )
              }
            >
              <b>View Course</b>
            </button>
          </div>
        </section>
        <section>
          <div className="d-flex row ">
            <img
              src={`../../src/assets/images/courseImages/${course.firstImage}`}

              className="col-4 "
            />
            <img
              src={`../../src/assets/images/courseImages/${course.secondImage}`}
              className="col-4"
            />
            <img
              src={`../../src/assets/images/courseImages/${course.thirdImage}`}
              className="col-4"
            />
          </div>
          <div className="mt-2 d-flex flex-wrap justify-content-md-between justify-content-start flex-md-row flex-column">
            <div className="duration d-flex gap-2 ">
              <span className="text-center rounded border p-2">
                {course?.duration}
              </span>
              <span className="text-center rounded border p-2">
                {course?.difficultyLevel}
              </span>
            </div>
            <p className="fw-bold mt-2">{course?.instructor}</p>
          </div>

          <div className="card mt-2 mb-4">
            <div className="card-header h5 bg-white">Curriculum</div>
            <div className="card-body row d-flex justify-content-evenly">
              <div className="curriculum col-md-2 col-sm-12 p-3 text-md-center border border-top-0 border-start-0 border-bottom-0 ">
                <h1>01</h1>
                <p className="fw-medium">{course?.firstTopic}</p>
              </div>
              <div className="curriculum col-md-2 col-sm-12 p-3 text-md-center border border-top-0 border-start-0 border-bottom-0 ">
                <h1>02</h1>
                <p className="fw-medium">{course?.secondTopic}</p>
              </div>
              <div className="curriculum col-md-2 col-sm-12 p-3 text-md-center border border-top-0 border-start-0 border-bottom-0 ">
                <h1>03</h1>
                <p className="fw-medium">{course?.thirdTopic}</p>
              </div>
              <div className="curriculum col-md-2 col-sm-12 p-3 text-md-center border border-top-0 border-start-0 border-bottom-0 ">
                <h1>04</h1>
                <p className="fw-medium">{course?.fourthTopic}</p>
              </div>
              <div className="col-md-2 col-sm-12 p-3  text-md-center ">
                <h1>05</h1>
                <p className="fw-medium">{course?.fifthTopic}</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  });

  return (
    <div className="bg-light">
      {descriptionDocument ? (
        <section className="description_section container mt-5 mb-5 border-bottom">
          <div className="description_container row ">
            <h1 className="col-md-6 col-12">{descriptionDocument?.heading}</h1>
            <p className="col-md-6 col-12">{descriptionDocument?.content}</p>
          </div>
        </section>
      ) : (
        ""
      )}

      {renderCourseList}
    </div>
  );
};

export default Course;
