package com.example.ekm.Controller;

import com.example.ekm.Assembler.PointAssembler;
import com.example.ekm.Assembler.TrailAssembler;
import com.example.ekm.DTO.PointOutputDTO;
import com.example.ekm.DTO.TrailInputDTO;
import com.example.ekm.DTO.TrailOutputDTO;
import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
import com.example.ekm.Repository.PointRepository;
import com.example.ekm.Repository.TrailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/trails")
public class TrailController {

    @Autowired
    TrailRepository trailRepository;
    @Autowired
    PointRepository pointRepository;
    @Autowired
    PointAssembler pointAssembler;
    @Autowired
    TrailAssembler trailAssembler;

    @GetMapping("/")
    public @ResponseBody
    List<TrailOutputDTO> getTrails() {
        List<Trail> trails = trailRepository.findAll();
        return trailAssembler.toResources(trails);
    }

    @PostMapping("/")
    public long addTrail(@RequestBody TrailInputDTO trailInputDTO) {
        Trail trail = new Trail();
        trail.setName(trailInputDTO.getName());
        trail.setDescription(trailInputDTO.getDescription());
        trailRepository.saveAndFlush(trail);
        return trail.getId();
    }

    @GetMapping("/{id}")
    public @ResponseBody
    TrailOutputDTO getTrail(@PathVariable long id) {
        Trail trail = trailRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Didn't find trail specified."));
        return trailAssembler.toResource(trail);
    }
    
    @DeleteMapping("/{id}")
    public void deleteTrail(@PathVariable long id) {
        trailRepository.deleteById(id);
        trailRepository.flush();
    }

    @GetMapping("/{id}/points/")
    public @ResponseBody
    List<PointOutputDTO> getTrailPoints(@PathVariable long id) {
        List<Point> points = pointRepository.findAllByTrail(trailRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Didn't find trail specified.")));
        return pointAssembler.toResources(points);
    }
    
    @DeleteMapping("/{id}/points/")
    public void deleteTrailPoints(@PathVariable long id) {
        List<Point> points = pointRepository.findAllByTrail(trailRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Didn't find trail specified.")));
        points.forEach(point -> pointRepository.delete(point));
        pointRepository.flush();
    }
}
