CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `virtual_library`.`book_totalMarks_avgMark` AS
    SELECT 
        `virtual_library`.`books`.`idbooks` AS `book_id`,
        COUNT(0) AS `total_marks_num`,
        AVG(`virtual_library`.`marks`.`value`) AS `avg_mark`
    FROM
        ((`virtual_library`.`book_marks`
        JOIN `virtual_library`.`marks` ON ((`virtual_library`.`marks`.`idmarks` = `virtual_library`.`book_marks`.`id_mark`)))
        JOIN `virtual_library`.`books` ON ((`virtual_library`.`books`.`idbooks` = `virtual_library`.`book_marks`.`id_book`)))
    GROUP BY `virtual_library`.`books`.`idbooks`