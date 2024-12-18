import React, { useState } from "react";
import axios from "axios";
import { FiUploadCloud, FiDownload, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

function Pcap_Csv() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && /\.(pcap|pcapng)$/i.test(selectedFile.name)) {
      setFile(selectedFile);
      setStatus("");
      setDownloadLink(null);
      setProgress(0);
    } else {
      alert("Please select a valid PCAP or PCAPNG file");
      e.target.value = null;
    }
  };

  const removeFile = () => {
    setFile(null);
    setStatus("");
    setProgress(0);
    setDownloadLink(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("pcapFile", file);

    try {
      setStatus("Processing...");
      setProgress(0);

      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      setStatus("Processing complete!");
      setDownloadLink(`http://localhost:5000/downloads/${response.data.csvFile}`);
      setProgress(100);
    } catch (error) {
      setStatus("Upload failed! Please try again.");
      setProgress(0);
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-3xl">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
          PCAP to CSV Converter
        </h2>
        <form
          onSubmit={handleUpload}
          className="space-y-6 animate-fadeIn transition-all"
        >
          {/* Upload Area */}
          <label className="block">
            <input
              type="file"
              accept=".pcap, .pcapng"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <div className="flex items-center justify-center cursor-pointer bg-purple-50 border-4 border-dashed border-purple-300 rounded-xl p-8 hover:bg-purple-100 hover:border-purple-500 transition duration-300">
              <label
                htmlFor="file-upload"
                className="text-purple-600 font-medium text-center flex flex-col items-center"
              >
                <FiUploadCloud className="text-5xl mb-2 animate-pulse" />
                <span className="text-lg">
                  {file ? (
                    <span className="font-semibold text-gray-700">
                      {file.name}
                    </span>
                  ) : (
                    "Drag & Drop or Click to Upload PCAP"
                  )}
                </span>
              </label>
            </div>
          </label>

          {/* File Preview and Remove Option */}
          {file && (
            <div className="flex items-center justify-between bg-purple-100 rounded-lg p-3 shadow-inner">
              <span className="text-purple-600 font-medium">{file.name}</span>
              <button
                onClick={removeFile}
                type="button"
                className="text-red-500 hover:text-red-600 transition-all"
              >
                <FiXCircle className="text-2xl" />
              </button>
            </div>
          )}

          {/* Progress Bar & Button */}
          {file && (
            <div>
              {progress > 0 && (
                <div className="relative w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="absolute top-0 left-0 bg-purple-500 h-4 rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="absolute inset-0 flex justify-center items-center text-sm text-white font-bold">
                    {progress}%
                  </span>
                </div>
              )}
              <button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                disabled={status === "Processing..."}
              >
                {status === "Processing..." ? "Processing..." : "Extract CSV"}
              </button>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div className="text-center mt-4">
              {status.includes("complete") ? (
                <div className="flex justify-center items-center gap-2 text-green-500 text-lg font-semibold">
                  <FiCheckCircle className="text-2xl" />
                  {status}
                </div>
              ) : status.includes("failed") ? (
                <div className="flex justify-center items-center gap-2 text-red-500 text-lg font-semibold">
                  <MdErrorOutline className="text-2xl" />
                  {status}
                </div>
              ) : (
                <p className="text-purple-600 font-semibold">{status}</p>
              )}
            </div>
          )}

          {/* Download Button */}
          {downloadLink && (
            <a
              href={downloadLink}
              className="flex items-center justify-center w-full mt-4 bg-green-500 text-white py-3 rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
              download
            >
              <FiDownload className="mr-2 text-2xl" /> Download CSV
            </a>
          )}
        </form>
      </div>
    </div>
  );
}

export default Pcap_Csv;
