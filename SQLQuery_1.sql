CREATE TABLE Tasks (
    color VARCHAR(20),
    tasks VARCHAR(255),
    [date] VARCHAR(20),
    [time] VARCHAR(20),
    [status] BIT DEFAULT 0
);

INSERT INTO Tasks (color, tasks, [date], [time])
VALUES ('red', 'Database Connection', '17-08-2024', '11:45 AM');

select * from tasks



