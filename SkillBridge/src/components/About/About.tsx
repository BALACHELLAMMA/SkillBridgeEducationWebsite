import { useEffect, useState } from "react";
import "./About.scss";
import { databases, storage } from "../../appwriteConfig";
interface AboutDocumentFieldType{
  title:string;
  image:string;
  content:string;
}
const About = () => {
  const [descriptionDocument, setDescriptionDocument] = useState<any>({});
  const [achievementDocument, setAchievementDocument] = useState<any>({
    documents: []
  });
  const [goalDocument, setGoalDocument] = useState<any>({
    documents: []
  });

  useEffect(() => {
    const fetchDescription = async () => {
      try {

        const descriptionResponse = await databases.getDocument(
          "65a0d58f05d18f1fd844",
          "DescriptionDataCollection",
          "3"
        );

        const achievementDataResponse = await databases.listDocuments("65a0d58f05d18f1fd844", "AchievementDataCollection");
        const goalDataResponse = await databases.listDocuments("65a0d58f05d18f1fd844", "GoalDataCollection");

        if(descriptionResponse){
          setDescriptionDocument(descriptionResponse);
        }

        if(achievementDataResponse){
          setAchievementDocument(achievementDataResponse);
        }
        if(goalDataResponse){
          setGoalDocument(goalDataResponse);
        }

      } catch (error) {
        console.error("List documents error : ", error);
      }
    };
    fetchDescription();
  }, []);


  const renderAboutContent = (aboutContentDocuments: any) => {
    const aboutContent = aboutContentDocuments.documents?.map((aboutContent:AboutDocumentFieldType) => {
      return (
        <div className="col">
          <div className="about_content_card card border-0 bg-white p-3 d-flex gap-2">
            <img src={`../src/assets/images/aboutImages/${aboutContent?.image}`} alt=".." />
            <h6>{aboutContent?.title}</h6>
            <p>{aboutContent?.content}</p>
          </div>
        </div>

      );
    });
    return aboutContent;
  }
  return (
    <div>
      {descriptionDocument ? (
        <section className="description_section container mt-5 mb-5 border-bottom">
          <div className="description_container row ">
            <h1 className="col-md-6 col-12">{descriptionDocument?.heading}</h1>
            <p className="col-md-6 col-12">{descriptionDocument?.content}</p>
          </div>
        </section>
      ) : ''}

      <section className="container bg-light">
        <div className="d-flex flex-column gap-3">

          <section className="content mt-5 mb-5 " >
            <h2>Achievements</h2>
            <p>Our commitment to excellence has led us to achieve significant milestones along our journey. Here are some of our notable achievements</p>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {renderAboutContent(achievementDocument)}
            </div>
          </section>

          <section className="content mt-5 mb-5 " >
            <h2>Our Goals</h2>
            <p>At SkillBridge, our goal is to empower individuals from all backgrounds to thrive in the world of design and development. We believe that education should be accessible and transformative, enabling learners to pursue their passions and make a meaningful impact.
              Through our carefully crafted courses, we aim to</p>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {renderAboutContent(goalDocument)}
            </div>
          </section>
        </div>
      </section>

      <section className="container mt-5 bg-light" id="company">
        <div className="bg-white  d-flex flex-column flex-md-row rounded">
          <div className="p-3">
            <h2>
              <span className="text-warning">Together</span>, let's shape the
              future of digital innovation
            </h2>
            <p>
              Join us on this exciting learning journey and unlock your
              potential in design and development.
            </p>
          </div>
          <div className="d-flex flex-row-reverse flex-md-row">
            <div className="abstractDesign_image_container">
              <img src={`${storage.getFilePreview('Images', 'AbstractDesignImage')}`} className="abstractDesign img-fluid" />
            </div>
            <div className="d-flex align-items-center justify-content-center p-3">
              <button className="join_button rounded border-0 text-white p-2">
                Join now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
