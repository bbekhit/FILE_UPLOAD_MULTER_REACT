import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUpload = ({ product_id, getPhotos }) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [productPhotos, setProductPhotos] = useState([]);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  useEffect(() => {
    const getProductPhotos = async () => {
      let res = await axios.get(`/api/photo/all/${product_id}`);
      getPhotos(res.data);
    };
    getProductPhotos();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(
        `/api/photo/upload/${product_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log(res);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  // uploadImage = file => {
  //   const { onUpload } = this.props;
  //   const data = new FormData();
  //   const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;
  //   const cloudName = process.env.REACT_APP_CLOUD_NAME;
  //   const url =
  //     "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
  //   data.append("file", file);
  //   data.append("upload_preset", uploadPreset);
  //   delete axios.defaults.headers.common["Authorization"];
  //   axios
  //     .post(url, data)
  //     .then(res => {
  //       if (res.data.secure_url !== "") {
  //         onUpload(res.data.secure_url);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  //   setAuthToken(localStorage.jwtToken);
  // };

  return (
    <div className="container m-5 w-50 mx-auto">
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
          disabled={file === ""}
        />
      </form>
    </div>
  );
};

export default FileUpload;
