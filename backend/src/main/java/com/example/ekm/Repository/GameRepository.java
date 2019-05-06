package com.example.ekm.Repository;

import com.example.ekm.Model.Game;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Game findByPointAndGameUser(Point point, GameUser gameUser);

    List<Game> findByGameUser(GameUser gameUser);

    List<Game> findByTrailAndGameUser(Trail trail, GameUser gameUser);
    
    @Override
    void deleteById(Long aLong);
}
