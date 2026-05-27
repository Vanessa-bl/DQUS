import { motion, type Variants } from "framer-motion";
import "./ImageCard.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.12 * i },
  }),
};

type ImageCardProps = {
  image: string;
  stat: string;
  title: string;
  description: string;
  index?: number;
};

export function ImageCard({ image, stat, title, description, index = 0 }: ImageCardProps) {
  return (
    <motion.div
      className="img-card"
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div
        className="img-card__bg"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="img-card__overlay" />
      <div className="img-card__glass" />
      <div className="img-card__content">
        <span className="img-card__stat">{stat}</span>
        <h3 className="img-card__title">{title}</h3>
        <p className="img-card__desc">{description}</p>
      </div>
    </motion.div>
  );
}
