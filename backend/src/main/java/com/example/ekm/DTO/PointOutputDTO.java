package com.example.ekm.DTO;

import com.example.ekm.Model.Trail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.ResourceSupport;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class PointOutputDTO extends ResourceSupport {
    Long point_id;
    Long trail_id;
    String name;
    String description;
    String lon;
    String lat;
}
