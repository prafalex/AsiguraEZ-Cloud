ARG PYTHON_VERSION=3.12.0

FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN python -m venv venv
RUN /bin/bash -c "source venv/bin/activate"

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

FROM base as final

COPY . .

EXPOSE 5002

CMD ["flask", "run", "--host=0.0.0.0", "--port=5002"]
