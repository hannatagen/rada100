package com.example.ekm.Assembler;

import com.example.ekm.Controller.GameController;
import com.example.ekm.DTO.GameOutputDTO;
import com.example.ekm.Model.Game;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class GameAssembler extends ResourceAssemblerSupport<Game, GameOutputDTO> {
    public GameAssembler() {
        super(GameController.class, GameOutputDTO.class);
    }

    public GameOutputDTO toResource(Game game) {
        return GameOutputDTO.builder()
                .gameId(game.getId())
                .pointId(game.getPoint().getId())
                .trailId(game.getTrail().getId())
                .visited(game.getVisited())
                .build();
    }
}
