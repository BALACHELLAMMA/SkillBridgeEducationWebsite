import { useEffect, useState } from "react";
import useToggleState from "../CommonFunctionalities/CustomHook/useToggleState";
import { Link, useNavigate } from "react-router-dom";
import { databases } from "../../appwriteConfig";
import { Query } from "appwrite";

function CourseSection(): JSX.Element {
  const [viewAll, setViewAll] = useToggleState(false);
  const [courseDataDocuments, setCourseDataDocuments] = useState({documents : []}); 
  const navigate = useNavigate();
 
  useEffect(()=>{
    const fetchCourseData = async () => {
      try {
        const courseResponse = await databases.listDocuments(
          "65a0d58f05d18f1fd844",
          "CourseDataCollection",
          [Query.orderAsc("id")]
        );
        setCourseDataDocuments(courseResponse);
      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchCourseData();
  },[]);


  const handleGetItNow = (courseId: number) => {
    navigate("/course", { state: { courseId } });
  };

  const CourseList = () => {
    const renderCourses = (startIndex: number, endIndex: number) => {
      const renderedCourses: JSX.Element[] = [];

      for (let i = startIndex; i <= endIndex; i++) {
        const course = courseDataDocuments.documents?.[i];

        renderedCourses.push(
          <div className="col">
            <div className="card border-0 p-2">
              <div className="card-body d-flex flex-column gap-2">
                <img
                  src={`../src/assets/images/courseImages/${course?.image}`}
                  className="card-img-top"
                  alt="web_design_fundamentals"
                />
                <div className="mt-2 d-flex justify-content-center flex-wrap justify-content-sm-between">
                  <div className="duration d-flex gap-2">
                    <span className="text-center rounded border p-2">
                      {course?.weeks}
                    </span>
                    <span className="text-center rounded border p-2">
                      {course?.difficultyLevel}
                    </span>
                  </div>
                  <p className="fw-bold mt-2 text-center">
                    {course?.instructor}
                  </p>
                </div>
                <h5 className="card-title">{course?.title}</h5>
                <p className="card-text">{course?.description}</p>
                <Link
                  to="/course"
                  className="get_it_now btn btn-light  w-100 fw-bold text-decoration-none"
                  onClick={() => handleGetItNow(course?.id)}
                >
                  Get it now
                </Link>
              </div>
            </div>
          </div>
        );
      }

      return renderedCourses;
    };

    return (
      <div className="d-flex flex-column gap-2">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {renderCourses(0, 5)}
          {viewAll && renderCourses(6, courseDataDocuments.documents.length - 1)}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <h1>Our Courses</h1>
        <section className="course_description d-flex justify-content-between row mb-5">
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
        <CourseList />
      </div>
    </>
  );
}

export default CourseSection;
