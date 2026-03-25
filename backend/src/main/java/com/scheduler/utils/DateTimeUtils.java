package com.scheduler.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeUtils {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    public static LocalDateTime parse(String dateTimeStr) {
        return LocalDateTime.parse(dateTimeStr, formatter);
    }

    public static String format(LocalDateTime dateTime) {
        return dateTime.format(formatter);
    }

    public static LocalDateTime now() {
        return LocalDateTime.now();
    }
}
