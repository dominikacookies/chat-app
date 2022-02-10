import React from "react";
import { EditFilled, CameraFilled, DeleteFilled } from "@ant-design/icons";
import { useState } from "react";
import S3 from "react-aws-s3";
import ImageUploading from "react-images-uploading";

const ImageUpload = ({ id, setImageUrl, imageUrl }) => {
  const [images, setImages] = useState([]);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const onUpload = async () => {
    const file = images[0].file;
    const fileName = `${id}/images/profile/${file.name}`;

    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };

    try {
      const ReactS3Client = new S3(config);
      const s3Data = await ReactS3Client.uploadFile(file, fileName);
      if (s3Data.status === 204) {
        setImageUrl(s3Data.location);
        setImages([]);
      } else {
        console.log("Failed to upload image");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="App py-3">
      <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
        {({ imageList, onImageUpload, onImageRemoveAll }) => (
          <div className="upload__image-wrapper">
            <div className="card-action-area text-center">
              {images.length !== 0 && (
                <>
                  <div>
                    <img
                      className="preview-image"
                      alt={images[0].name}
                      src={images[0]["data_url"]}
                    />
                    <div className="preview-title my-2">Image Preview</div>
                  </div>
                </>
              )}

              {imageList.length !== 0 && (
                <div className="d-flex gap-2 justify-content-center px-3">
                  <button className="logo-button" onClick={onImageRemoveAll}>
                    <span className="upload-logo">
                      <DeleteFilled size="1.5rem" />
                    </span>
                  </button>

                  <button className="logo-button" onClick={onImageUpload}>
                    <span className="upload-logo">
                      <EditFilled size="1.5rem" />
                    </span>
                  </button>
                </div>
              )}
            </div>

            {imageList.length !== 0 && (
              <div className="d-flex gap-2 justify-content-center py-2">
                <button onClick={onUpload}>Upload</button>
              </div>
            )}

            <div className="image-upload-actions">
              {imageList.length === 0 && (
                <button
                  type="button"
                  className="upload-btn"
                  onClick={onImageUpload}
                >
                  <span className="upload-logo">
                    <CameraFilled size="1.5rem" fill="black" />
                  </span>
                  SELECT PROFILE IMAGE
                </button>
              )}

              {imageUrl && (
                <div className="uploaded-image-div">
                  <img
                    alt={imageUrl}
                    className="preview-image"
                    src={imageUrl}
                  />
                  <div className="preview-title my-2">Uploaded Image</div>
                </div>
              )}
            </div>
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

export default ImageUpload;
