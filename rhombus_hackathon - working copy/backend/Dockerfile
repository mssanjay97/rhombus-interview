# Use a Python base image
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Create data directory and copy sample data
RUN mkdir -p data
COPY data/weapons_data.csv data/

# Expose the port Flask runs on
EXPOSE 5000

# Command to run the Flask application
CMD ["python", "app.py"]