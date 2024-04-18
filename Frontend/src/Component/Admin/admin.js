// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { MdDownload } from "react-icons/md"; // Assuming you have imported the FiDownload icon
// import "./admin.css";

// const Adm = () => {
//   const [userData, setUserData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = () => {
//     axios
//       .get("http://localhost:8000/attendance_app")
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const downloadCSV = (data) => {
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       data.map((row) => Object.values(row).join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "data.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <>
//       <div className="admincon">
//         <h2>User Data</h2>
//         {error && <p>{error}</p>}
//         <table border="2">
//           <thead>
//             <tr>
//               <th>id</th>
//               <th>User ID</th>
//               <th>Date</th>
//               <th>Time</th>
//               <th>Activity Type</th>
//               <th>Comments</th>
//               <th>Download</th> {/* New column for download button */}
//             </tr>
//           </thead>
//           <tbody>
//             {userData.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.Userid}</td>
//                 <td>{user.Date}</td>
//                 <td>{user.Time}</td>
//                 <td>{user.Activity_type}</td>
//                 <td>{user.Comments}</td>
//                 <td>
//                   <button onClick={() => downloadCSV([user])} id="down-btn">
//                     <MdDownload />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default Adm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDownload } from "react-icons/md"; // Assuming you have imported the FiDownload icon
import "./admin.css";

const Adm = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get("http://localhost:8000/attendance_app")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      });
  };

  const downloadCSV = (data) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="admincon">
        <h2>User Data</h2>
        {error && <p>{error}</p>}
        <div className="table-container">
          <table border="2">
            <thead>
              <tr>
                <th>id</th>
                <th>User ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Activity Type</th>
                <th>Comments</th>
                <th>Download</th> {/* New column for download button */}
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.Userid}</td>
                  <td>{user.Date}</td>
                  <td>{user.Time}</td>
                  <td>{user.Activity_type}</td>
                  <td>{user.Comments}</td>
                  <td>
                    <button onClick={() => downloadCSV([user])} id="down-btn">
                      <MdDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Adm;
