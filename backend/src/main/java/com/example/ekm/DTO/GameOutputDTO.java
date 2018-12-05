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
public class GameOutputDTO extends ResourceSupport {
    Long gameId;
    Long trailId;
    Long pointId;
    Boolean visited;
}
