DROP DATABASE `vendors-db`;

CREATE SCHEMA `vendors-db`;

CREATE TABLE `vendors-db`.`vendors` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lat` FLOAT NOT NULL,
  `lon` FLOAT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `connectionURL` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `vendors-db`.`vendors` (`id`, `lat`, `lon`, `name`, `connectionURL`) VALUES ('1', '40.1599', '44.5115', 'VTB Tigran Mets 48', 'http://localhost:3001');
INSERT INTO `vendors-db`.`vendors` (`id`, `lat`, `lon`, `name`, `connectionURL`) VALUES ('2', '40.1693', '44.5145', 'INECO Tigran Mets 29A', 'http://localhost:3002');
INSERT INTO `vendors-db`.`vendors` (`id`, `lat`, `lon`, `name`, `connectionURL`) VALUES ('3', '40.1596', '44.5137', 'ACBA Lisinyan 4', 'http://localhost:3003');
