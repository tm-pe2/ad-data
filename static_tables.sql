INSERT INTO contracts_status (name, description) 
VALUES
    ('Not Validated', 'When a contract is created but the meter values are not read yet and the contracted has not started.'),
    ('Active', 'Meters are read and the contract has started'),
    ('Expired', 'End date reached and not renewed' );

INSERT INTO customers_types (description) 
VALUES
    ('Private'),
    ('Company');


INSERT INTO invoices_types (name,description) 
VALUES
    ('Advance Payment', 'Invoicing each month a fixed amount based on the estimated consumption'),
    ('Debit Note','End of year invoice to be paid by customer'),
    ('Credit Note', "End of year invoice in customer's favour");

INSERT INTO plannings_statuses (description) 
VALUES
    ('Scheduled'),
    ('Done');

INSERT INTO roles (name,description) 
VALUES
    ('customer', 'customer'),
    ('supplier', 'supplier'),
    ('employee', 'employee'),
    ('accountant', 'accountant'),
    ('technician', 'technician'),
    ('support', 'support'),
    ('manager', 'manager'),
    ('hr_manager', 'hr_manager'),
    ('admin', 'admin');

INSERT INTO statuses_for_invoices (description) 
VALUES
    ('Due'),
    ('Late'),
    ('Paid');

INSERT INTO tariffs(customer_type, value)
VALUES
    (1,0.291),
    (2,0.106);