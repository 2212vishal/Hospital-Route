# Hospital Backend Project (https://hospital-route.onrender.com/)

This project provides RESTful API endpoints for managing hospitals, psychiatrists, and patients.

## Hospital Routes

1. **Register a Hospital**
   - **Route:** `POST /api/v1/hospital`
   - **Description:** Register a hospital with a unique name and email.
   - **Request Body (Form Data):**
     - `name` (String): Hospital name
     - `email` (String): Hospital email
   - **Example Usage (Postman):**
     - Set request type to POST
     - Set URL to `https://hospital-route.onrender.com/api/v1/hospital`
     - Go to Body tab, select form-data, and add the required fields
     - Click Send

2. **Get Hospital Data**
   - **Route:** `GET /api/v1/hospital`
   - **Description:** Get a list of all hospitals.
   - **Example Usage (Postman):**
     - Set request type to GET
     - Set URL to `https://hospital-route.onrender.com/api/v1/hospital`
     - Click Send

3. **Get Hospital Data By Hospital ID**
   - **Route:** `GET /api/v1/hospital/:id`
   - **Description:** Get the data of a hospital by its ID.
   - **Example Usage (Postman):**
     - Set request type to GET
     - Set URL to `https://hospital-route.onrender.com/api/v1/hospital/66459fe0136b355704dfcdf7`
     - Click Send

## Psychiatrist Routes 

1. **Create an Entry of Psychiatrist**
   - **Route:** `POST api/v1/psychiatrist`
   - **Description:** Create an entry of a psychiatrist with a name and hospitalID.
   - **Request Body (Form Data):**
     - `name` (String): Psychiatrist name
     - `hospitalID`: Hospital ID
   - **Example Usage (Postman):**
     - Set request type to POST
     - Set URL to `https://hospital-route.onrender.com/api/v1/psychiatrist`
     - Go to Body tab, select form-data, and add the required fields
     - Click Send

2. **Get Psychiatrist Data By Id**
   - **Route:** `GET /api/v1/psychiatrist/:id`
   - **Description:** Get a psychiatrist's data by their ID.
   - **Example Usage (Postman):**
     - Set request type to GET
     - Set URL to `https://hospital-route.onrender.com/api/v1/psychiatrist/663cf72a1d6dea8ba8432246`
     - Click Send

## Patient Routes 

1. **Create an Entry of Patient**
   - **Route:** `POST api/v1/patient`
   - **Description:** Create an entry of a patient with name, psychiatristID, hospitalID, address, email, password, phone, and photo.
   - **Request Body (Form Data):**
     - `name` (String): Patient name
     - `hospitalID`: Hospital ID
     - `psychiatristID`: Psychiatrist ID
     - `address`: Patient address
     - `email`: Patient email
     - `password`: Patient password
     - `phone`: Patient phone number
     - `photo`: Patient photo (file)
   - **Example Usage (Postman):**
     - Set request type to POST
     - Set URL to `https://hospital-route.onrender.com/api/v1/patient`
     - Go to Body tab, select form-data, and add the required fields
     - Click Send

2. **Get Patient Details**
   - **Route:** `GET api/v1/patient`
   - **Description:** Get a patient's details by their email and password.
   - **Request Body (Form Data):**
     - `email` (String): Patient email
     - `password`: Patient password
   - **Example Usage (Postman):**
     - Set request type to GET
     - Set URL to `https://hospital-route.onrender.com/api/v1/patient`
     - Click Send

Please note that all endpoints require proper authentication and authorization.



