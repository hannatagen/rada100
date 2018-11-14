package com.example.ekm.Controller;

import com.example.ekm.Assembler.GameAssembler;
import com.example.ekm.Assembler.TrailAssembler;
import com.example.ekm.DTO.GameOutputDTO;
import com.example.ekm.DTO.TrailOutputDTO;
import com.example.ekm.Model.Game;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
import com.example.ekm.Repository.GameRepository;
import com.example.ekm.Repository.GameUserRepository;
import com.example.ekm.Repository.PointRepository;
import com.example.ekm.Repository.TrailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameUserRepository gameUserRepository;

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private TrailRepository trailRepository;

    @Autowired
    private GameAssembler gameAssembler;

    @Autowired
    private TrailAssembler trailAssembler;

    @GetMapping("/")
    public @ResponseBody
    List<TrailOutputDTO> getStartedGames(Principal principal) {
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        List<Game> startedGames = gameRepository.findByGameUser(gameUser);
        List<Trail> startedTrails = new ArrayList<>();
        for (Game game : startedGames) {
            if (!startedTrails.contains(game.getTrail())) {
                startedTrails.add(game.getTrail());
            }
        }
        return trailAssembler.toResources(startedTrails);
    }

    @PostMapping("/point/{point_id}")
    public void addGamePoint(@PathVariable long point_id, Principal principal) {
        Point point = pointRepository.getOne(point_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        Game game = gameRepository.findByPointAndGameUser(point, gameUser);
        game.setVisited(true);
        gameRepository.saveAndFlush(game);
    }

    @GetMapping("/point/{point_id}")
    public Boolean getGamePoint(@PathVariable long point_id, Principal principal) {
        Point point = pointRepository.getOne(point_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        Game game = gameRepository.findByPointAndGameUser(point, gameUser);
        return game.getVisited();
    }

    @PostMapping("/{trail_id}")
    public @ResponseBody
    void addGame(@PathVariable long trail_id, Principal principal) {
        Trail trail = trailRepository.getOne(trail_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        List<Point> points = pointRepository.findAllByTrail(trail);
        for (Point point : points) {
            Game game = new Game();
            game.setGameUser(gameUser);
            game.setPoint(point);
            game.setTrail(trail);
            game.setVisited(false);
            gameRepository.saveAndFlush(game);
        }
    }

    @GetMapping("/{trail_id}")
    public @ResponseBody
    List<GameOutputDTO> getGamePoints(@PathVariable long trail_id, Principal principal) {
        Trail trail = trailRepository.getOne(trail_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        List<Game> games = gameRepository.findByTrailAndGameUser(trail, gameUser);
        return gameAssembler.toResources(games);
    }

    @GetMapping("/{trail_id}/started")
    public boolean isStarted(@PathVariable long trail_id, Principal principal) {
        Trail trail = trailRepository.getOne(trail_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        List<Game> games = gameRepository.findByTrailAndGameUser(trail, gameUser);
        return !games.isEmpty();
    }

    @GetMapping("/{trail_id}/ended")
    public boolean isEnded(@PathVariable long trail_id, Principal principal) {
        Trail trail = trailRepository.getOne(trail_id);
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        List<Game> games = gameRepository.findByTrailAndGameUser(trail, gameUser);
        if(!isStarted(trail_id, principal)) return false;
        for (Game game : games) {
            if (!game.getVisited()) {
                return false;
            }
        }
        return true;
    }
}
