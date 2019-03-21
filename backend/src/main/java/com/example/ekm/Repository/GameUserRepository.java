package com.example.ekm.Repository;

import com.example.ekm.Model.GameUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameUserRepository extends JpaRepository<GameUser, Long> {
    GameUser findByUsername(String username);
    
    @Override
    List<GameUser> findAll();
}
