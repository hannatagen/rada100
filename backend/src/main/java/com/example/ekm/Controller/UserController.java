package com.example.ekm.Controller;

import com.example.ekm.Assembler.GameUserAssembler;
import com.example.ekm.DTO.GameUserInputDTO;
import com.example.ekm.DTO.GameUserOutputDTO;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.UserRole;
import com.example.ekm.Repository.GameUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private GameUserRepository gameUserRepository;
    private GameUserAssembler gameUserAssembler;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public UserController(GameUserRepository gameUserRepository, GameUserAssembler gameUserAssembler, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.gameUserRepository = gameUserRepository;
        this.gameUserAssembler = gameUserAssembler;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @PostMapping("/register")
    public void signUp(@RequestBody GameUserInputDTO user) {
        GameUser gameUser = new GameUser();
        gameUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        gameUser.setRole(UserRole.PLAYER);
        gameUser.setEmail(user.getEmail());
        gameUser.setUsername(user.getUsername());
        gameUserRepository.saveAndFlush(gameUser);
    }
    
    @GetMapping("/users/list")
    public @ResponseBody
    List<GameUserOutputDTO> getAllUsers() {
        List<GameUser> users = gameUserRepository.findAllByRole(UserRole.PLAYER);
        return gameUserAssembler.toResources(users);
    }
    
    @GetMapping("/users/delete/{id}")
    public void deleteUserById(@PathVariable long id) {
        gameUserRepository.deleteById(id);
    }
}