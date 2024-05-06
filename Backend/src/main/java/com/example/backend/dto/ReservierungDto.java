package com.example.backend.dto;


import com.example.backend.entity.Media;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReservierungDto {

    private long id;
    private Long user;
    private Long media;
    private Date aus_datum;
    private Date ab_datum;
}
