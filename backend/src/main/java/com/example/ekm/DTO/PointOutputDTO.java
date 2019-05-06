package com.example.ekm.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PointOutputDTO extends ResourceSupport {
    Long pointId;
    Long trailId;
    String name;
    String description;
    String longitude;
    String latitude;
}
