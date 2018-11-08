package com.example.ekm.Controller;

import com.example.ekm.Model.Trail;
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
        Trail trail = new Trail(name, description);
        trailRepository.save(trail);

        LOG.info(trail.toString() + " successfully saved into DB");

        return trail.getId();
    }

    @GetMapping("/trail")
    public @ResponseBody List<Trail> getTrails() {
        List<Trail> trails = trailRepository.findAll();
        return trails;
    }

    @GetMapping("/trail/{id}")
    public @ResponseBody Trail getTrail(@PathVariable long id) {
        Trail trail = trailRepository.findById(id).get();
        return trail;
    }


}
