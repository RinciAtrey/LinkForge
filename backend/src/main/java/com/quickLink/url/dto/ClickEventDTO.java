package com.quickLink.url.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClickEventDTO {
    private LocalDate clickDate;         //output in the api
    private Long count;
}
