import React, { FC } from "react";
import styles from "./SelectedCard.module.scss";
import { ButtonType, SingleCardType } from "../../utils/@globalTypes";
import Button from "../Button";

export type SelectedMovieProps = {
  singleCard: SingleCardType;
};
const SelectedCard: FC<SelectedMovieProps> = ({ singleCard }) => {
  const {
    poster,
    name,
    description,
    year,
    release_date,
    revenue,
    country,
    rating,
    runtime,
  } = singleCard;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.posterContainer}>
          <img src={poster} alt={"Movie Poster"} />
          <div className={styles.buttonWrapper}>
            <Button onClick={() => {}} type={ButtonType.Bookmark} />
            <Button onClick={() => {}} type={ButtonType.Share} />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{name}</div>
          <div className={styles.ratingWrapper}>
            <div className={styles.rating}>{rating}</div>
            <div className={styles.runtime}>{runtime} min</div>
          </div>
          <div className={styles.description}>{description}</div>
          <div className={styles.smallInfoContainer}>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Year</div>
              <div className={styles.content}>{year}</div>
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Released</div>
              {release_date && (
                <div className={styles.content}>
                  {release_date.slice(0, 10)}
                </div>
              )}
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>BoxOffice</div>
              <div className={styles.content}>
                {revenue ? revenue : `Unavailable`}
              </div>
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Country</div>
              <div className={styles.content}>
                {country ? country : `Unavailable`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedCard;
