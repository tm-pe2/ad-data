CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(256) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    national_registry_number VARCHAR(50) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS  users_roles (
    role_id INT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES roles(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    city_name VARCHAR(50) NOT NULL,
    postal_code INT NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
    id SERIAL PRIMARY KEY,
    street VARCHAR(50) NOT NULL,
    house_number VARCHAR(50) NOT NULL,
    city_id INT NOT NULL,
    country VARCHAR(50),
    CONSTRAINT fk_city FOREIGN KEY(city_id) REFERENCES cities_postalcodes(id)
);

CREATE TABLE IF NOT EXISTS users_addresses (
    user_id INT NOT NULL,
    address_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_address FOREIGN KEY(address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS customers_types (
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    user_id INT NOT NULL,
    type_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_type FOREIGN KEY(type_id) REFERENCES customers_types(id)
);

CREATE TABLE IF NOT EXISTS employees (
    user_id INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    hire_date DATE NOT NULL,
    gender SMALLINT NOT NULL,
    salary REAL NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS suppliers (
    user_id INT NOT NULL,
    contact_name VARCHAR(50),
    company_name VARCHAR(50) NOT NULL,
    supply_type VARCHAR(50) NOT NULL,
    vat_number VARCHAR(50) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS estimations (
    id SERIAL PRIMARY KEY,
    service_type INT NOT NULL,
    building_type SMALLINT NOT NULL,
    address_id INT NOT NULL,
    family_size SMALLINT NOT NULL,
    equipments VARCHAR(50) NOT NULL,
    past_consumption REAL NOT NULL,
    estimated_consumption REAL NOT NULL,
    CONSTRAINT fk_address FOREIGN KEY(address_id) REFERENCES addresses(id)
);

/*https://www.globalpetrolprices.com/Belgium/electricity_prices/#hl183*/

CREATE TABLE IF NOT EXISTS tariffs (
    id SERIAL PRIMARY KEY,
    customer_type_id INT NOT NULL,
    value REAL NOT NULL,
    CONSTRAINT fk_customer_type FOREIGN KEY(customer_type_id) REFERENCES customers_types(id)
);

CREATE TABLE IF NOT EXISTS contracts_status (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL ,
    description VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    tariff_id INT NOT NULL,
    estimation_id INT NOT NULL,
    address_id INT NOT NULL,
    service_type INT NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT fk_tariff FOREIGN KEY(tariff_id) REFERENCES tariffs(id),
    CONSTRAINT fk_estimation FOREIGN KEY(estimation_id) REFERENCES estimations(id),
    CONSTRAINT fk_address FOREIGN KEY(address_id) REFERENCES addresses(id)
);

CREATE TABLE IF NOT EXISTS customers_contracts (
    user_id INT NOT NULL,
    contract_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_contract FOREIGN KEY(contract_id) REFERENCES contracts(id)
);

CREATE TABLE IF NOT EXISTS plannings_statuses (
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS plannings (
    id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    date DATE NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT fk_contract FOREIGN KEY(contract_id) REFERENCES contracts(id),
    CONSTRAINT fk_status FOREIGN KEY(status_id) REFERENCES plannings_statuses(id)
);

CREATE TABLE IF NOT EXISTS meters (
    id SERIAL PRIMARY KEY,
    meter_type VARCHAR(50) NOT NULL,
    physical_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS indexes_values (
    id SERIAL PRIMARY KEY,
    meter_id INT NOT NULL,
    index_value INT NOT NULL,
    read_date DATE NOT NULL,
    CONSTRAINT fk_meter FOREIGN KEY(meter_id) REFERENCES meters(id)
);

CREATE TABLE IF NOT EXISTS consumptions (
    id SERIAL PRIMARY KEY,
    meter_id INT NOT NULL,
    consumed_value INT NOT NULL,
    calculated_date DATE NOT NULL,
    CONSTRAINT fk_meter FOREIGN KEY(meter_id) REFERENCES meters(id)
);

CREATE TABLE IF NOT EXISTS contracts_meters (
    contract_id INT NOT NULL,
    meter_id INT NOT NULL,
    CONSTRAINT fk_contract FOREIGN KEY(contract_id) REFERENCES contracts(id),
    CONSTRAINT fk_meter FOREIGN KEY(meter_id) REFERENCES meters(id)
);

CREATE TABLE IF NOT EXISTS statuses_for_invoices (
    id SERIAL PRIMARY KEY,
    description VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(250) NOT NULL
);

CREATE TABLE IF NOT EXISTS invoices (
    id SERIAL PRIMARY KEY,
    contract_id INT NOT NULL,
    supplier_id INT NOT NULL,
    type_id INT NOT NULL,
    creation_date DATE NOT NULL,
    due_date DATE NOT NULL,
    tariff_id INT NOT NULL,
    price REAL NOT NULL,
    tax REAL NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    CONSTRAINT fk_contract FOREIGN KEY(contract_id) REFERENCES contracts(id),
    CONSTRAINT fk_supplier FOREIGN KEY(supplier_id) REFERENCES users(id),
    CONSTRAINT fk_type FOREIGN KEY(type_id) REFERENCES invoices_types(id),
    CONSTRAINT fk_tariff FOREIGN KEY(tariff_id) REFERENCES tariffs(id)
);

CREATE TABLE IF NOT EXISTS invoices_statuses (
    invoice_id INT NOT NULL,
    status_id INT NOT NULL,
    CONSTRAINT fk_invoice FOREIGN KEY(invoice_id) REFERENCES invoices(id),
    CONSTRAINT fk_status FOREIGN KEY(status_id) REFERENCES statuses_for_invoices(id)
);