package com.example.ekm.Assembler;

import com.example.ekm.Controller.PointController;
import com.example.ekm.DTO.PointOutputDTO;
import com.example.ekm.Model.Point;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class PointAssembler extends ResourceAssemblerSupport<Point, PointOutputDTO> {
    public PointAssembler() {
        super(PointController.class, PointOutputDTO.class);
    }

    public PointOutputDTO toResource(Point point) {
        return PointOutputDTO.builder()
                .pointId(point.getId())
                .trailId(point.getTrail().getId())
                .name(point.getName())
                .description(point.getDescription())
                .longitude(point.getLongitude())
                .latitude(point.getLatitude())
                .link(point.getLink())
                .build();
    }
}
