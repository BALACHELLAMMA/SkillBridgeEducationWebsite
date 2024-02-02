import "./Course.scss";

import { useLocation} from 'react-router-dom';

function CourseOpenPage() {
  // const { title } = useParams();
  const location = useLocation();
  const courseDetails = location.state;
  // console.log(courseDetails);
  return (
    <div>
      {/* {descriptionList
        .filter((description) => {
          return (description.title === "coursepage");
        })
        .map((description) => (
          <section
            className="description_section container mt-5 mb-5 border-bottom"
            key={description.heading}
          >
            <div className="description_container row">
              <h1 className="col-md-6 col-12">{courseDetails[0]}</h1>
              <p className="col-md-6 col-12">{courseDetails[1]}</p>
            </div>
          </section>
        ))} */}
      <div className="courseImageContainer container">
        <img src={`${courseDetails[2]}`} className="courseImage img-fluid" alt="Course" />
      </div>

      <div className="container mt-5 mb-5">
        <div className="row row-cols-1 row-cols-md-2 g-3">
          {uiuxDesignCourseData.map((course) => {
            return (
              <div className="col ">
                <div className="card border-0 bg-white p-3 d-flex gap-2">
                  <h1 className="fw-bold align-self-end">0{course.id}</h1>
                  <h5>{courseDetails[3][course.id-1]}</h5>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="fw-medium">
                        {course.content[0][0]}
                      </p>
                      <p className="text-secondary">{course.content[0][1]}</p>
                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2">
                      <img src={clock_icon} alt="duration" />
                      <p>{course.content[0][2]}</p>
                    </div>
                  </div>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="fw-medium">
                        {course.content[1][0]}
                      </p>
                      <p className="text-secondary">{course.content[1][1]}</p>
                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2">
                      <img src={clock_icon} alt="duration" />
                      <p>{course.content[1][2]}</p>
                    </div>
                  </div>
                  <div className="content_container border d-flex flex-wrap flex-md-row flex-column justify-content-md-between p-3 rounded">
                    <div className="topic_container">
                      <p className="fw-medium">
                        {course.content[2][0]}
                      </p>
                      <p className="text-secondary">{course.content[2][1]}</p>
                    </div>
                    <div className="duration_container border bg-light rounded d-flex align-items-start gap-2 p-2">
                      <img src={clock_icon} alt="duration" />
                      <p>{course.content[2][2]}</p>
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

