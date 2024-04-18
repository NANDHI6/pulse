require("dotenv").config();
const express = require("express");
const db = require("./app/node-mysql-server/db-con");
const app = express();
const cors = require("cors");
const { hash } = require("bcrypt");

// const corsOptions = {
//   origin: "http://localhost:3000", // Only allow requests from this origin
//   //methods: ["GET", "POST"], // Allow only specified methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow only specified headers
//   credentials: true, // Enable sending cookies and authorization headers
// };
app.use(cors());

// const { GenericResponse, ResponseStatus } = require("./GenericResponse");
// const ErrorMessage = require("./ErrorMessage");
const swaggerui = require("swagger-ui-express");
const swaggerDocument = require("./app/SwaggerSpecs/swagger.json");
// const  swaggerJsDoc= require("swagger-jsdoc");

// const authRouter = require("./app/routes/auth");
// app.use("/",authRouter)

const routePath = require("./app/controllers/routes/auth");
app.use(express.json());

// !  FOR CREATE
app.use("/user/create", routePath);
// !  FOR LOGIN
app.use("/user/login", routePath);
// !  FOR AUTH
app.use("/", routePath);
// !  FOR RESET PASS
app.use("/user/reset", routePath);

// !  FOR CLEAR ALL THE ENTRIES(FOR CHECKING)
app.use("/user/clear", require("./app/routes/path"));
// /auth--
// const options = {
//   definition:{
//     openapi:"3.0.0",
//     info:{b
//       title:"Attendance API",
//       Version: "1.0.0",
//       description:"To Manage the Employee attendance."
//     },
//     servers:[
//       {
//         url: "http://localhost:8000"
//       }
//     ],
//   },
//   apis:["./routes/*.js"]
// }
// const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerDocument));
// *  IN THIS LINE CORS IS USED TO PASS THE DATA TO REACT

// *  THIS IS IMPORTANT ONE FOR API CATCH

// !  FETCH ALL
app.get("/user/fetch", (req, res) => {
  const sql = "SELECT * FROM appuser";
  db.query(sql, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

// !    FOR RESEST PASSWORD THROUGH THE LINK

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // For example, using Gmail. You may need to use another service or configure this differently
//   auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//   },
// });

// app.post('/user/password-reset', async (req, res) => {
//   const { email } = req.body;
//   // In a real application, you'd generate a token, save it with the user record in your database, and use it in the reset link
//   const resetToken = "YourTokenHere"; // Use a real token generation method
//   const resetLink = `http://resetpass.com/reset-password?token=${resetToken}`;

//   try {
//       await transporter.sendMail({
//           from: process.env.EMAIL_USERNAME, // sender address
//           to: email, // list of receivers
//           subject: "Password Reset Request", // Subject line
//           html: `<p>Please click <a href="${resetLink}">here</a> to reset your password.</p>`, // html body
//       });

//       res.json({ message: "Password reset link sent!" });
//   } catch (error) {
//       console.error("Failed to send email", error);
//       res.status(500).json({ message: "Failed to send password reset link" });
//   }
// });

//! API FOR MAIN PAGE

// app.post("/attendance_app", (req, res) => {
//   // const { Time_activity } = req.body;
//   const { Date } = req.body;
//   const { Time } = req.body;
//   const { Userid } = req.body;
//   const { Activity_type } = req.body;
//   const { Comments } = req.body;

//   // Extract Login_Time from req.body

//   // Insert the data into the database
//   const sql =
//     "INSERT INTO time_table ( Userid,Date,Time, Activity_type,Comments) VALUES (?, ? ,?,?,?)"; // Assuming your table has a column named Login_Time
//   db.query(
//     sql,
//     [Userid, Date, Time, Activity_type, Comments],
//     (err, result) => {
//       if (err) {
//         console.error("Error inserting data:", err);
//         res.status(500).send("Error inserting data into database");
//       } else {
//         console.log("Data inserted successfully");
//         // console.log(Time_activity);
//         res.status(200).send("Data inserted successfully");
//       }
//     }
//   );
// });

// app.get("/attendance_app", (req, res) => {
//   const sql = "SELECT * FROM time_table";
//   db.query(sql, (error, data) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     } else {
//       return res.json(data);
//     }
//   });
// });

// app.post("/attendance_app", (req, res) => {
//   const { Date, Time, Userid, Activity_type, Comments } = req.body;

//   let sql = "";
//   let values = [];

//   // Determine the SQL query based on the activity type
//   switch (Activity_type) {
//     case "login":
//     case "logout":
//       sql =
//         "INSERT INTO time_table (Userid, Date, Time, Activity_type) VALUES (?, ?, ?, ?)";
//       values = [Userid, Date, Time, Activity_type];
//       break;
//     case "breakin":
//     case "breakout":
//       sql =
//         "INSERT INTO time_table (Userid, Date, Time, Activity_type, Comments) VALUES (?, ?, ?, ?, ?)";
//       values = [Userid, Date, Time, Activity_type, Comments];
//       break;
//     default:
//       return res.status(400).send("Invalid activity type");
//   }

//   // Execute the SQL query
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting data:", err);
//       res.status(500).send("Error inserting data into database");
//     } else {
//       console.log("Data inserted successfully");
//       res.status(200).send("Data inserted successfully");
//     }
//   });
// });

// app.get("/attendance_app", (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: "Email address is required" });
//   }

//   const sql = "SELECT * FROM time_table WHERE Userid = ?";
//   db.query(sql, [email], (error, data) => {
//     if (error) {
//       return res.status(500).json({ error: error.message });
//     } else {
//       return res.json(data);
//     }
//   });
// });
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server running on port: ${port}`);
// });

app.post("/attendance_app", (req, res) => {
  const { Date, Time, Userid, Activity_type, Comments } = req.body;

  let sql = "";
  let values = [];

  // Determine the SQL query based on the activity type
  switch (Activity_type) {
    case "login":
    case "logout":
    case "lunchin":
    case "lunchout":
      sql =
        "INSERT INTO time_table (Userid, Date, Time, Activity_type, Comments) VALUES (?, ?, ?, ?, ?)";
      values = [Userid, Date, Time, Activity_type, Comments];
      break;
    case "breakin":
    case "breakout":
      sql =
        "INSERT INTO time_table (Userid, Date, Time, Activity_type, Comments) VALUES (?, ?, ?, ?, ?)";
      values = [Userid, Date, Time, Activity_type, Comments];
      break;
    default:
      return res.status(400).send("Invalid activity type");
  }

  // Execute the SQL query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data into database");
    } else {
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.get("/attendance_app", (req, res) => {
  const sql = "SELECT * FROM time_table";
  db.query(sql, (error, data) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.json(data);
    }
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
