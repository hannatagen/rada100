package com.example.ekm.Repository;

import com.example.ekm.Model.Trail;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TrailRepository extends CrudRepository<Trail, Long> {
    List<Trail> findAll();
}
