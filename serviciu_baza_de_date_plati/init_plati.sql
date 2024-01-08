CREATE TABLE IF NOT EXISTS insurance_payments (
    id SERIAL PRIMARY KEY,
    id_policy INTEGER NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

