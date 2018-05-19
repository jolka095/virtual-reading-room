CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `virtual_library`.`book_info` AS
    SELECT 
        `book_author_category`.`book_id` AS `book_id`,
        `book_author_category`.`title` AS `title`,
        `book_author_category`.`publish_date` AS `publish_date`,
        `book_author_category`.`publisher` AS `publisher`,
        `book_author_category`.`ISBN` AS `ISBN`,
        `book_author_category`.`image` AS `image`,
        `book_author_category`.`synopsis` AS `synopsis`,
        `book_author_category`.`text` AS `text`,
        `book_author_category`.`author` AS `author`,
        `book_author_category`.`author_id` AS `author_id`,
        `book_series_view`.`series` AS `series`,
        `book_series_view`.`series_id` AS `series_id`,
        `book_author_category`.`category` AS `category`,
        `book_author_category`.`category_id` AS `category_id`,
        `book_totalMarks_avgMark`.`total_marks_num` AS `total_marks_num`,
        `book_totalMarks_avgMark`.`avg_mark` AS `avg_mark`
    FROM
        ((`virtual_library`.`book_author_category`
        JOIN `virtual_library`.`book_series_view` ON ((`book_series_view`.`book_id` = `book_author_category`.`book_id`)))
        JOIN `virtual_library`.`book_totalMarks_avgMark` ON ((`book_totalMarks_avgMark`.`book_id` = `book_author_category`.`book_id`)))