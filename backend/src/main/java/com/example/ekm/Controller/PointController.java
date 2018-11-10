package com.example.ekm.Controller;

import com.example.ekm.Assembler.PointAssembler;
import com.example.ekm.DTO.PointOutputDTO;
import com.example.ekm.Model.Point;
import com.example.ekm.Repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/points")
public class PointController {

    @Autowired
    PointRepository pointRepository;
    @Autowired
    PointAssembler pointAssembler;

    @GetMapping("/")
    public @ResponseBody
    List<PointOutputDTO> getPoints() {
        List<Point> points = pointRepository.findAll();
        return pointAssembler.toResources(points);
    }

    @GetMapping("/{id}")
    public @ResponseBody
    PointOutputDTO getPoint(@PathVariable long id) {
        Point point = pointRepository.findById(id).get();
        return pointAssembler.toResource(point);
    }
}
