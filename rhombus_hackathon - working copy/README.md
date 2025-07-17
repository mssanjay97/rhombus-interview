# Rhombus Power - Weapons Position Dashboard

This project implements a full-stack interactive dashboard for visualizing weapons position data, as specified in the Rhombus Power hackathon prompt. It consists of a Python Flask backend for data processing and an React frontend for interactive mapping and data visualization. The entire system is containerized using Docker and orchestrated with Docker Compose.

## Table of Contents

1.  [Features](#features)
2.  [Technology Stack](#technology-stack)
3.  [Project Structure](#project-structure)
4.  [Setup and Running with Docker Compose](#setup-and-running-with-docker-compose)
    * [Prerequisites](#prerequisites)
    * [Steps to Run](#steps-to-run)
5.  [API Endpoints (Backend)](#api-endpoints-backend)
6.  [Frontend Usage](#frontend-usage)
7.  [Data Ingestion, Cleaning, and Analysis](#data-ingestion-cleaning-and-analysis)
8.  [Algorithmic Component](#algorithmic-component)
9.  [Considerations for a Real-World Scenario](#considerations-for-a-real-world-scenario)

## Features

* **Interactive Map Display:** Visualize weapons positions on an OpenStreetMap base layer.
* **Data Filtering:** Filter weapons by type, status, and a calculated risk score.
* **Data Summaries/Charts:** Display aggregate data such as weapon counts by type and status using bar charts.
* **Backend Data Processing:** Ingests, cleans, and analyzes simulated weapons data.
* **RESTful API:** Provides data to the frontend via well-defined API endpoints.
* **Containerized Environment:** Easy setup and consistent environment using Docker.

## Technology Stack

**Backend:**
* **Python 3.9+**
* **Flask:** Web framework for building the API.
* **Flask-CORS:** Handles Cross-Origin Resource Sharing.
* **Pandas:** For efficient data manipulation, cleaning, and analysis.
* **Numpy:** For numerical operations.

**Frontend:**
* **React 18+**
* **React-Leaflet:** React components for interactive Leaflet maps.
* **Axios:** Promise-based HTTP client for API requests.
* **Recharts:** For building interactive charts (e.g., bar charts).
* **Standard CSS:** For basic styling.

**Containerization:**
* **Docker**
* **Docker Compose**

## Project Structure