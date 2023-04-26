import React, { FC } from "react";
import styles from "./SelectedCard.module.scss";
import { ButtonType, Credit, SingleCardType } from "../../utils/@globalTypes";
import Button from "../Button";
import { DateTime } from "luxon";

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
    rating,
    runtime,
    genres,
    credits,
  } = singleCard;

  const allGenres = genres?.map((genre) => (
    <p key={genre.id}>
      {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
    </p>
  ));

  const getNamesByDepartment = (
    credits: Credit[] | undefined,
    department: string
  ) => {
    return credits
      ?.map((item) => {
        if (item.pivot.department === department) {
          return item.name;
        }
      })
      .filter((item) => item != undefined)
      .join(", ");
  };

  const writers = getNamesByDepartment(credits, "writing");
  const directors = getNamesByDepartment(credits, "directing");
  const cast = getNamesByDepartment(credits, "cast");
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
          <div className={styles.genres}>{allGenres}</div>
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
                  {DateTime.fromISO(release_date)
                    .setLocale("en")
                    .toFormat("dd MMMM yyyy")}
                </div>
              )}
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>BoxOffice</div>
              <div className={styles.content}>
                {revenue
                  ? `${
                      revenue
                        .toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })
                        .split(".")[0]
                    }`
                  : `Unavailable`}
              </div>
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Actors</div>
              <div className={styles.content}>{cast}</div>
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Director</div>
              <div className={styles.content}>{directors}</div>
            </div>
            <div className={styles.smallInfoWrapper}>
              <div className={styles.title}>Writers</div>
              <div className={styles.content}>{writers}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedCard;
