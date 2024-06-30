FROM python:3.9-slim
From pytorch/pytorch:latest-gpu
WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
COPY ./entrypoint.sh .
EXPOSE 8080
ENTRYPOINT [ "sh","/app/entrypoint.sh" ]