// git add .
git commit -m "first commit"
git push

PDF-to-XML Converter
A full-stack web application that allows users to upload PDF documents and convert them to structured XML format while preserving document structure.

Setup and Run Instructions
Prerequisites
Node.js (v14 or higher)
MongoDB (local installation or MongoDB Atlas account)
npm or yarn package manager
Backend Setup
Clone the repository

git clone https://github.com/yourusername/pdf-to-xml-converter.git
cd pdf-to-xml-converter

Send command to Terminal
Install backend dependencies

cd server
npm install

Send command to Terminal
Create a .env file in the server directory with the following variables:

PORT=5000
MONGO_URI=mongodb://localhost:27017/pdf-converter
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

Create uploads directory

mkdir uploads

Send command to Terminal
Start the backend server

npm run dev

Send command to Terminal
Frontend Setup
Open a new terminal and navigate to the client directory

cd ../client

Send command to Terminal
Install frontend dependencies

npm install

Send command to Terminal
Create a .env file in the client directory:

REACT_APP_API_URL=http://localhost:5000/api

Start the React development server

npm start

Send command to Terminal
Access the application at http://localhost:3000

Technology Choices and Reasoning
Backend
Node.js & Express: Chosen for their efficiency in building RESTful APIs and handling asynchronous operations, which is crucial for file processing tasks.
MongoDB: Selected for its flexibility with document-based storage, making it ideal for storing conversion metadata and user information.
Mongoose: Used for data modeling and validation to ensure data integrity.
JWT Authentication: Implemented for secure, stateless authentication that works well with RESTful APIs.
pdf-parse: Utilized for its reliable PDF text extraction capabilities with good structure preservation.
Multer: Chosen for handling multipart/form-data and file uploads with robust validation options.
Frontend
React: Selected for its component-based architecture that enables building a modular and maintainable UI.
Context API: Used for state management as it provides a clean way to share state across components without prop drilling, while being lighter than Redux for this scale of application.
React Router: Implemented for client-side routing to create a seamless single-page application experience.
Axios: Chosen for making HTTP requests due to its promise-based API and interceptor capabilities.
Bootstrap: Utilized for responsive design and pre-built components to accelerate UI development.
Challenge Level Implemented
I implemented Level 2 of the challenge, which includes:

User authentication and authorization
PDF upload and conversion to XML
Structure preservation in the conversion process
Conversion history management
User-specific data access control
Approach to PDF-to-XML Conversion
The conversion process follows these steps:

File Upload: The PDF file is uploaded and temporarily stored on the server.
Text Extraction: The pdf-parse library extracts text content from the PDF.
Structure Analysis: Custom logic analyzes the extracted text to identify structural elements:
Headings are identified based on font size and positioning
Paragraphs are recognized by line breaks and indentation patterns
Lists are detected through consistent indentation and bullet/number patterns
XML Generation: The identified structural elements are transformed into a hierarchical XML structure.
Result Storage: Both the original PDF and the generated XML are stored, with metadata saved to MongoDB.
Assumptions and Limitations
PDF Content: The application works best with text-based PDFs. Scanned PDFs would require OCR processing, which is not implemented.
Complex Layouts: PDFs with complex layouts (multiple columns, tables, etc.) may not have their structure perfectly preserved.
Language Support: The application primarily supports English and other Latin-based languages. PDFs with right-to-left languages or special characters may have inconsistent results.
File Size: There's a 10MB limit on PDF uploads to prevent server overload.
Security: While basic security measures are implemented, the application would need additional hardening for production use.
Future Improvements
Enhanced Structure Recognition:

Implement more sophisticated algorithms for detecting tables, lists, and multi-column layouts
Add support for image extraction and placement in the XML output
Batch Processing:

Allow users to upload multiple PDFs at once
Implement background processing with job queues for handling large files
Advanced Customization:

Provide options for users to customize the XML structure
Add support for different XML schemas and output formats (e.g., HTML, Markdown)
OCR Integration:

Integrate OCR capabilities to handle scanned PDFs
Implement language detection for better text extraction
Testing and Performance:

Add comprehensive unit and integration tests
Implement caching strategies for frequently accessed conversions
Optimize the PDF processing algorithm for better performance with large documents
User Experience:

Add a preview feature to see the conversion results before downloading
Implement drag-and-drop file upload
Add progress indicators for large file conversions
