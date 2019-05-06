package com.example.ekm.Repository;

import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameUserRepository extends JpaRepository<GameUser, Long> {
    GameUser findByUsername(String username);
    
    @Override
    List<GameUser> findAll();
    
    @Override
    void deleteById(Long aLong);
    
    List<GameUser> findAllByRole(UserRole userRole);
    
    @Override
    Optional<GameUser> findById(Long aLong);
}
