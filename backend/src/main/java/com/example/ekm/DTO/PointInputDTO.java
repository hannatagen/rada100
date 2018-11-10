package com.example.ekm.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PointInputDTO {
    Long trail_id;
    String name;
    String description;
    String lon;
    String lat;
    String link;
}
