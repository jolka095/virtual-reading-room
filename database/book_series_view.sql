CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `virtual_library`.`book_series_view` AS
    SELECT 
        `virtual_library`.`books`.`idbooks` AS `book_id`,
        `virtual_library`.`series`.`idseries` AS `series_id`,
        `virtual_library`.`series`.`name` AS `series`
    FROM
        ((`virtual_library`.`books`
        LEFT JOIN `virtual_library`.`book_series` ON ((`virtual_library`.`book_series`.`id_book` = `virtual_library`.`books`.`idbooks`)))
        LEFT JOIN `virtual_library`.`series` ON ((`virtual_library`.`book_series`.`id_series` = `virtual_library`.`series`.`idseries`)))