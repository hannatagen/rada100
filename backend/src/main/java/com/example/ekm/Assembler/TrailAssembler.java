package com.example.ekm.Assembler;

import com.example.ekm.Controller.TrailController;
import com.example.ekm.DTO.TrailOutputDTO;
import com.example.ekm.Model.Trail;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class TrailAssembler extends ResourceAssemblerSupport<Trail, TrailOutputDTO> {

    public TrailAssembler() {
        super(TrailController.class, TrailOutputDTO.class);
    }

    public TrailOutputDTO toResource(Trail trail) {
        return TrailOutputDTO.builder()
                .trail_id(trail.getId())
                .name(trail.getName())
                .description(trail.getDescription())
                .build();
    }
}
