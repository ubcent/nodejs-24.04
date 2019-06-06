CREATE DATABASE todo;

CREATE TABLE `tasks` (
  `idtasks` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `priority` int(11) DEFAULT '0' COMMENT '0 - the lowest\n5 - the highest\n',
  PRIMARY KEY (`idtasks`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `todo`.`tasks`
(`title`,
`desc`,
`status`,
`priority`)
VALUES
("Task1", "Task 1 for testing", 1, 5),
("Task2", "Task 2 for testing", 0, 2);

