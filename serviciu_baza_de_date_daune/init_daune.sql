CREATE TABLE IF NOT EXISTS insurance_claim (
    id SERIAL PRIMARY KEY,
    id_policy INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    date_reported TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    status VARCHAR(255) NOT NULL
);
