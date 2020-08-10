import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { FormControl } from "@material-ui/core";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import database from "./firebaseApp";
import Cards from "./Cards";
import Header from "./header";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [modal, setModal] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const toggle = () => setModal(!modal);

  const exp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(exp);

  const urlValidate = /(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
  const urlregex = new RegExp(urlValidate);

  const getBookmarks = () => {
    //
    database.collection("Bookmarks").onSnapshot((snapshot) => {
      setBookmarks(snapshot.docs.map((doc) => doc.data()));
      setBookmarks(
        snapshot.docs.map((doc) => ({ id: doc.id, bmk: doc.data() }))
      );
    });
  };

  useEffect(() => {
    getBookmarks();
  }, []);

  const addmark = (event) => {
    event.preventDefault();

    if (url.match(regex)) {
      if (!url.match(urlregex)) {
        setUrl("https://" + url);
      }
      const urlId = new URLSearchParams(new URL(url).search);
      var id;
      if (urlId.get("t")) {
        id = url.split("/")[3].substring(0, 11);
      } else {
        if (!urlId.get("v")) {
          id = url.split("/")[3].substring(0, 11);
        } else {
          id = url.split("v=")[1].substring(0, 11);
        }
      }
    } else {
      return toast("Please enter the valid URL from YouTube", {
        type: "warning",
      });
    }
    if (title === "") {
      return toast("Please Enter The  Title", {
        type: "warning",
      });
    }
    if (id == null) {
      return toast("Please enter the valid URL from YouTube", {
        type: "warning",
      });
    }
    database
      .collection("Bookmarks")
      .add({
        id: id,
        title: title,
        note: note,
        url: url,
      })
      .then(function () {
        toast("Bookmark Saved Successfully ", { type: "success" });
      });

    setModal(!modal);
    setNote("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="app">
      <Modal isOpen={modal} toggle={toggle} className="className inputModal">
        <ModalHeader toggle={toggle}>
          <h3>Create Bookmark</h3>
        </ModalHeader>
        <form className="form">
          <FormControl className="formcontrol">
            <ModalBody className="modalBody">
              <input
                type="text"
                value={url}
                className="inputUrl"
                placeholder="Paste the Youtube Video URL"
                required
                onChange={(event) => setUrl(event.target.value)}
              />
              <input
                type="text"
                value={title}
                className="inputTitle"
                placeholder="Enter the Title"
                required
                onChange={(event) => setTitle(event.target.value)}
              />
              <textarea
                type="text"
                value={note}
                className="inputNote"
                cols="3"
                rows="5"
                placeholder="Add the Note (optinoal)"
                required={false}
                onChange={(event) => setNote(event.target.value)}
              />
              <Button
                type="submit"
                color="primary"
                onClick={addmark}
                className="mAddBtn"
              >
                Add
              </Button>
            </ModalBody>
          </FormControl>
        </form>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Header />
      <ToastContainer />
      <div className="body">
        <div className="cHolder">
          {/* TODO Add the functionality to display message if no bookmarks are
          present */}
          {Object.keys(bookmarks)?.length > 0 ? (
            bookmarks.map((bookmark) => <Cards bookmark={bookmark} />)
          ) : (
            <div className="errInt">
              <h1 className="title">You don't seem to have any bookmark</h1>
              <h3 className="title">
                Click To <span className="txtadd">Add</span> One
              </h3>
            </div>
          )}
        </div>
        <Button onClick={toggle} className="addButton">
          Add
        </Button>
      </div>
    </div>
  );
}

export default App;
