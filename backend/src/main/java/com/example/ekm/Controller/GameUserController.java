package com.example.ekm.Controller;

import com.example.ekm.Assembler.GameUserAssembler;
import com.example.ekm.DTO.GameUserOutputDTO;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Repository.GameUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class GameUserController {

    @Autowired
    private GameUserRepository gameUserRepository;

    @Autowired
    private GameUserAssembler gameUserAssembler;

    @GetMapping("/")
    public @ResponseBody
    List<GameUserOutputDTO> getUsers() {
        List<GameUser> gameUsers = gameUserRepository.findAll();
        return gameUserAssembler.toResources(gameUsers);
    }

    @GetMapping("/information")
    public @ResponseBody
    GameUserOutputDTO getUser(Principal principal) {
        GameUser gameUser = gameUserRepository.findByUsername(principal.getName());
        return gameUserAssembler.toResource(gameUser);
    }
}
