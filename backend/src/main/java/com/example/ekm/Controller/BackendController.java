package com.example.ekm.Controller;

import com.example.ekm.Assembler.PointAssembler;
import com.example.ekm.Assembler.TrailAssembler;
import com.example.ekm.DTO.PointOutputDTO;
import com.example.ekm.DTO.TrailOutputDTO;
import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
import com.example.ekm.Repository.PointRepository;
import com.example.ekm.Repository.TrailRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;

import java.util.List;

@RestController()
@RequestMapping("/api")
public class BackendController {

    @Autowired
    TrailRepository trailRepository;

    @Autowired
    PointRepository pointRepository;

    @Autowired
    PointAssembler pointAssembler;

    @Autowired
    TrailAssembler trailAssembler;

    private static final Logger LOG = LoggerFactory.getLogger(BackendController.class);

    private static final String HELLO_TEXT = "Hello from Spring Boot Backend!1111";

    @RequestMapping(path = "/hello")
    public @ResponseBody String sayHello() {
        LOG.info("GET called on /hello resource");
        return HELLO_TEXT;
    }

    @PostMapping("/trail")
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody long addNewTrail(@RequestParam String name, @RequestParam String description) {
        Trail trail = new Trail();
        trailRepository.save(trail);

        LOG.info(trail.toString() + " successfully saved into DB");

        return trail.getId();
    }

    @GetMapping("/trails/")
    public @ResponseBody List<TrailOutputDTO> getTrails() {
        List<Trail> trails = trailRepository.findAll();
        return trailAssembler.toResources(trails);
    }

    @GetMapping("/trails/{id}")
    public @ResponseBody TrailOutputDTO getTrail(@PathVariable long id) {
        Trail trail = trailRepository.findById(id).get();
        return trailAssembler.toResource(trail);
    }

    @GetMapping("/trails/{id}/points/")
    public @ResponseBody List<PointOutputDTO> getTrailPoints(@PathVariable long id) {
        List<Point> points = pointRepository.findAllByTrail(trailRepository.findById(id).get());
        return pointAssembler.toResources(points);
    }

    @GetMapping("/points/")
    public @ResponseBody List<PointOutputDTO> getPoints() {
        List<Point> points = pointRepository.findAll();
        return pointAssembler.toResources(points);
    }

    @GetMapping("/points/{id}")
    public @ResponseBody PointOutputDTO getPoint(@PathVariable long id) {
        Point point = pointRepository.findById(id).get();
        return pointAssembler.toResource(point);
    }
}
