package com.example.ekm.Repository;

import com.example.ekm.Model.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrailRepository extends JpaRepository<Trail, Long> {
    List<Trail> findAll();
    
    @Override
    void deleteById(Long aLong);
}
