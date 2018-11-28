package com.example.ekm.Assembler;

import com.example.ekm.Controller.GameUserController;
import com.example.ekm.DTO.GameUserOutputDTO;
import com.example.ekm.Model.GameUser;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Service;

@Service
public class GameUserAssembler extends ResourceAssemblerSupport<GameUser, GameUserOutputDTO> {
    public GameUserAssembler() {
        super(GameUserController.class, GameUserOutputDTO.class);
    }

    public GameUserOutputDTO toResource(GameUser gameUser) {
        return GameUserOutputDTO.builder()
                .userId(gameUser.getId())
                .email(gameUser.getEmail())
                .username(gameUser.getUsername())
                .build();
    }
}
