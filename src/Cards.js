import React from "react";
import "./card.css";
import "bootstrap/dist/css/bootstrap.css";

import database from "./firebaseApp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = ({ bookmark }) => {
  const id = bookmark?.id;
  const _bookmark = bookmark?.bmk;

  const truncate = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str?.slice(0, num) + "...";
  };

  const deleteBtn = () => {
    console.log(id);

    database.collection("Bookmarks").doc(id).delete();
    toast(`${_bookmark?.title} Deleted Successfully`, { type: "success" });
  };

  return (
    <div className="card">
      <img
        className="card-img-top"
        src={`https://img.youtube.com/vi/${_bookmark?.id}/mqdefault.jpg`}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{_bookmark?.title}</h5>
        <div className="note">
          {_bookmark?.note === "" ? (
            <p className="nNotetext">No Note</p>
          ) : (
            <p className="text">{truncate(_bookmark?.note, 90)}</p>
          )}
        </div>
        <div className="cButtons">
          <a
            href={_bookmark?.url}
            className="btn btn-primary crBtn"
            target="_blank"
          >
            Visit
          </a>
          <a
            onClick={deleteBtn}
            className="btn btn-danger deBtn"
            target="_blank"
          >
            Delete
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cards;
