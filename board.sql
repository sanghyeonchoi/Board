CREATE TABLE icecream(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description TEXT NULL,
    created DATETIME NOT NULL,
    author VARCHAR(30) NULL,
    PRIMARY KEY (id));

INSERT INTO icecream (name,description,created,author) VALUES('붕어싸만코','붕어싸만코는 빙그레제품이다',NOW(),'리사');
INSERT INTO icecream (name,description,created,author) VALUES('메로나','메로나는 빙그레제품이다',NOW(),'지수');
INSERT INTO icecream (name,description,created,author) VALUES('옥수수콘','옥수수콘는 빙그레제품이다',NOW(),'제니');
INSERT INTO icecream (name,description,created,author) VALUES('거북알','거북알는 빙그레제품이다',NOW(),'로제');