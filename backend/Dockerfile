# Use official Python image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# Copy all files from local backend folder into /app in container
COPY . .

# Install required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development

# Expose the port Flask will run on
EXPOSE 5000

# Start the Flask app
CMD ["flask", "run"]
