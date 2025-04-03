// git add .
//git commit -m "first commit"
//git push

1.PDF to XML Converter (that is my intern coding challenge)
A full-stack web application that converts PDF documents to structured XML format while preserving document structure and formatting.

2.Challenge Level Implemented
I implemented covers Level 2 (Intermediate Implementation on which my expertise is mostly on backend) of the Full Stack Developer Intern Coding Challenge, including:

1.Proper JWT authentication
2.Improved PDF-to-XML conversion that maintains basic structure (paragraphs, headers)
3.Multi-page display of the converted document
4.Navigation for accessing previous conversions
5.Preview of both original PDF and converted XML
6.Error handling and validation
7.User profile management

==>Technology Stack
1.Backend
Node.js & Express: Chosen for its lightweight, fast, and scalable nature, making it ideal for building RESTful APIs.
MongoDB with Mongoose: Selected for its flexibility with unstructured data with not fixed schema and ease of integration with Node.js.
JWT Authentication: Implemented for secure, stateless authentication that works well with RESTful APIs.
Multer: Used for handling file uploads efficiently.
pdf-parse: Utilized for extracting text and metadata from PDF documents.
2.Frontend
React: Chosen for its component-based architecture, which enables building a modular and maintainable UI.
React Router: Implemented for client-side routing to create a single-page application experience.
Axios: Used for making HTTP requests to the backend API.
Bootstrap: Selected for rapid UI development with responsive design capabilities.
Context API: Utilized for state management, particularly for authentication state.

Setup and Run Instructions
==>Prerequisites
Node.js
npm
MongoDB (local installation)
Backend Setup
Clone the repository and navigate to the backend directory:
git clone <https://github.com/Priyanshushekhar77/intern_task.git>
cd intern_task/server

Send command to Terminal
npm init -y
Install dependencies:npm install express mongoose bcryptjs jsonwebtoken multer pdf-parse cors dotenv
npm install

Send command to Terminal
Create a .env file in the backend directory with the following content:
PORT=5000
MONGO_URI=mongodb://localhost:27017/pdf-to-xml
JWT_SECRET=your_jwt_secret_key_here(create your)

FOR Start the backend server:
node server.js

Send command to Terminal
or for development with auto-restart:

npm install -g nodemon
nodemon server.js

Send command to Terminal
Frontend Setup
Navigate to the frontend directory:
cd ../frontend

Send command to Terminal
Install dependencies:npm install axios react-router-dom bootstrap
npm install

Send command to Terminal
Start the development server:
npm start

Send command to Terminal
Open your browser and navigate to http://localhost:3000

==>Approach to PDF-to-XML Conversion
The PDF-to-XML conversion process follows these steps:
1.File Upload: The user uploads a PDF file through the frontend interface.
2.PDF Parsing: The backend uses pdf-parse to extract text content and metadata from the PDF.
3.Structure Analysis: The extracted text is analyzed to identify structural elements:
a.Paragraphs are identified by double line breaks
b.Headers are identified by their length and lack of ending punctuation
4.XML Generation: A structured XML document is created with:
Metadata section containing title, author, and page count
Content section with identified paragraphs and headers properly tagged
5.Result Storage: The conversion result is stored in the database, linked to the user's account.
6.Result Display: The XML is displayed to the user with options to copy or download.

Notes: => The application works best with text-based PDFs.
File Size: There's a 10MB file size limit for uploads to prevent server overload that i have implemented in my backend code.
Security: While the application implements JWT authentication, additional security measures would be needed for a production environment.

Future Improvements

1. Advanced User Management: Implement user roles, teams, and sharing capabilities.
2. API Documentation: Create comprehensive API documentation.
3. Performance Optimization: Implement caching and optimize the conversion process for larger documents.
4. Accessibility: Improve the application's accessibility features to ensure it's usable by everyone.
5. Mobile Responsiveness: Enhance the mobile experience for users on smaller devices.
