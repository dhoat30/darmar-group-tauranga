import styles from "./Process.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function RegularProcess({ title, description, cards, image }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className={`${styles.stepWrapper} `} key={index}>
        <div className={`${styles.title}`}>
          <div
            className={`${styles.stepTitleNumberWrapper} flex  align-center justify-center `}
          >
            <Typography variant="h6" component="div" className={`${styles.stepNumber}`}>{index + 1}</Typography>
          
          </div>
        </div>
        <div className={`${styles.content} mt-16`}>
        <Typography variant="h6" component="h3">
              {item.title}
            </Typography>
          <Typography
            variant="body1"
            component="div"
            className="description body1 mt-8" 
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="xl" className={`${styles.container}`}>
      
        <Container maxWidth="md" className={`${styles.contentWrapper} `}>
          <div className={`${styles.titleWrapper}`}>
            <Typography
              variant="h2"
              component="h2"
              className={`${styles.titleWrapper} center-align`}
            >
              {title}
            </Typography>
            {description && (
            
              <div             
              className="heading-5 mt-16 center-align"
              dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
          </div>
        </Container>
        
           <div
            className={`${styles.stepsWrapper} gap-24 space-between mt-40 `}
          >
            {stepCards}
          </div>
      </Container>
    </section>
  );
}
