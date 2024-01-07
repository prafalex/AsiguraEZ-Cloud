CREATE TABLE IF NOT EXISTS insurance_policy (
    id SERIAL PRIMARY KEY,
    id_insured INT,
    policy_no VARCHAR(255) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    amount NUMERIC(10,2),
    status VARCHAR(255) NOT NULL
);

